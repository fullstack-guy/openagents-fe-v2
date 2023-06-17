export function replaceUnderscoresAndCapitalize(str) {
    let modifiedStr = str.replace(/_/g, ' '); // replace underscores with spaces
    modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1); // capitalize first letter
    return modifiedStr;
}
