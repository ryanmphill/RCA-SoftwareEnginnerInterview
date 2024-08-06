/**
 * Create a new user
 * @param {PocketBase} pb - PocketBase instance
 * @param {Object} data - User data
 * @param {string} data.username - The user's username
 * @param {string} data.password - The user's password
 * @returns {Promise<Object>} - The user record
 */
export async function createUser(pb, data) {
    const record = await pb.collection("users").create(data);
    return record;
}

/**
 * Log in a user
 * @param {PocketBase} pb - PocketBase instance
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * @returns {Promise<Object>} - The user's auth data
 */
export async function loginUser(pb, username, password) {
    const authData = await pb
        .collection("users")
        .authWithPassword(username, password);
    return authData;
}

/**
 * Create a new user and logs them in
 * @param {PocketBase} pb - PocketBase instance
 * @param {Object} data - User data
 * @param {string} data.username - The user's username
 * @param {string} data.password - The user's password
 * @returns {Promise<Object|null>} - The user's auth data
 */
export async function createAndLoginUser(pb, data) {
    const record = await createUser(pb, data);
    if (record.id) {
        const authData = await loginUser(pb, data.username, data.password);
        return authData;
    }
    return null;
}

/**
 * Check if a user exists in the database
 * @param {PocketBase} pb - PocketBase instance
 * @param {string} name - Username to check
 * @returns {Promise<boolean>} - Whether the user exists
 */
export async function checkIfUserExists(pb, name) {
  try {
    const record = await pb
      .collection("users")
      .getFirstListItem(`username="${name}"`);
    if (record?.id) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
