type SignOutFn = () => Promise<void>;

let signOut: SignOutFn | null = null;

export const registerSignOut = (fn: SignOutFn) => (signOut = fn);

export const clearAuth = async () => {
  if (signOut) {
    try {
      await signOut();
    } catch (e) {
      console.error(e);
    }
  } else {
    console.warn("No signOut function registered");
  }
};
