const capitalizeFirstLetter = (letter: string): string=>{
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

export const GenericHelpers = {capitalizeFirstLetter}