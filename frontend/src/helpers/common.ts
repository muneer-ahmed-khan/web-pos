export const getEnv = (key: string, defaultVal: any = null) => {
  return import.meta.env[key] || defaultVal;
};
