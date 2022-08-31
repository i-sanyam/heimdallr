const resourceHandlers = {
    GITHUB: require('./github'),
};

const addAccess = async (resourceType, username, resourcePath) => {
    const resourceTypeHandler = resourceHandlers[resourceType];
    await resourceTypeHandler.prerequisite(username);
    const userHasAccess = await resourceTypeHandler.checkAccess(resourcePath, username);
    if (userHasAccess) {
        // throw new Error('User Already has access');
        return true;
    }
    await resourceTypeHandler.addAccess(resourcePath, username);
}

const removeAccess = async (resourceType, username, resourcePath) => {
    const resourceTypeHandler = resourceHandlers[resourceType];
    await resourceTypeHandler.prerequisite(username);
    const userHasAccess = await resourceTypeHandler.checkAccess(resourcePath, username);
    if (!userHasAccess) {
        // throw new Error('User Already has access');
        return true;
    }
    await resourceTypeHandler.removeAccess(resourcePath, username);
}

module.exports = {
    addAccess,
    removeAccess,
};