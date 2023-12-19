import { Preferences } from '@capacitor/preferences';

export const setData = async (key:string, value:string) => {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  };
  
export const getData = async (key:string):Promise<string|null> => {

    const { value } = await Preferences.get({ key: key });
    
    return value;
  };

export const getKeys = async():Promise<string[]>=>{
  return (await Preferences.keys()).keys;
}