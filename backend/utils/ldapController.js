const ldap = require("ldapjs");
const jwt = require("jsonwebtoken");

const roleMapping = {
    authority: "AUTHORITY",
    maintenance: "MAINTENANCE",
    ohs: "OHS",
    qrt: "QRT",
    superadmin: "SUPER_ADMIN"
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const client = ldap.createClient({
        url: process.env.LDAP_URL
    });

    client.on("error", (err) => {
        console.error("LDAP Client Error:", err);
    });

    client.bind(
        process.env.LDAP_ADMIN_DN,
        process.env.LDAP_ADMIN_PASS,
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Connection to LDAP Server failed. Please check configurations" });
            }

            const searchOptions = {
                filter: `(uid=${username})`,
                scope: "sub"
            };

            client.search(
                process.env.LDAP_BASE_DN,
                searchOptions,
                (err, searchRes) => {
                    if (err) {
                        return res.status(500).json({ message: "LDAP search failed" });
                    }

                    let userDN = null;

                    searchRes.on("searchEntry", (entry) => {
                        userDN = entry.dn.toString();
                    });

                    searchRes.on("end", () => {
                        if (!userDN) {
                            return res.status(404).json({ message: "User not found" });
                        }

                        client.bind(userDN, password, (err) => {
                            if (err) {
                                return res.status(401).json({ message: "Invalid credentials" });
                            }

                            client.bind(
                                process.env.LDAP_ADMIN_DN,
                                process.env.LDAP_ADMIN_PASS,
                                (err) => {
                                    if (err) {
                                        return res.status(500).json({ message: "Rebind failed" });
                                    }

                                    const groupSearchOptions = {
                                        filter: `(member=${userDN})`,
                                        scope: "sub"
                                    };

                                    client.search(
                                        process.env.LDAP_GROUP_BASE_DN,
                                        groupSearchOptions,
                                        (err, groupRes) => {
                                            if (err) {
                                                return res.status(500).json({ message: "Group search failed" });
                                            }

                                            let userRole = null;

                                            groupRes.on("searchEntry", (entry) => {
                                                const groupName = entry.pojo?.attributes
                                                    ?.find(attr => attr.type === "cn")
                                                    ?.values?.[0];

                                                if (groupName && roleMapping[groupName]) {
                                                    userRole = roleMapping[groupName];
                                                }
                                            });

                                            groupRes.on("end", () => {
                                                if (!userRole) {
                                                    return res.status(403).json({
                                                        message: "User has no assigned role"
                                                    });
                                                }

                                                const token = jwt.sign(
                                                    {
                                                        username,
                                                        role: userRole
                                                    },
                                                    process.env.JWT_SECRET,
                                                    { expiresIn: "8h" }
                                                );

                                                client.unbind();

                                                return res.json({
                                                    message: "Login successful",
                                                    username: username,
                                                    role: userRole,
                                                    token
                                                });
                                            });
                                        }
                                    );
                                }
                            );
                        });
                    });
                }
            );
        }
    );
};