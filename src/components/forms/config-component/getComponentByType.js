import CustomTextField from "src/components/forms/theme-elements/CustomTextField"
import CustomSlider from "src/components/forms/theme-elements/CustomSlider"
import CustomSwitch from "src/components/forms/theme-elements/CustomSwitch"
import CustomSelect from "src/components/forms/theme-elements/CustomSelect"


export const getComponentByType = (type, config, handleChange, values) => {
    switch (type) {
        case 'text':
            return <CustomTextField id={`${config.section}.${config.name}`}
                                    name={`${config.section}.${config.name}`}
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    placeholder={config.placeholder}
                                    onChange={handleChange}
                                    value={values[config.section] && values[config.section][config.name]} />;
        case 'image':
            // Use your image component here
        case 'color':
            // Use your color component here
        case 'slider':
            return <CustomSlider id={`${config.section}.${config.name}`} name={`${config.section}.${config.name}`} onChange={handleChange} value={values[config.section] && values[config.section][config.name]} />;
        case 'number':
            // Use your number component here
        case 'switch':
            return <CustomSwitch id={`${config.section}.${config.name}`} name={`${config.section}.${config.name}`} onChange={handleChange} value={values[config.section] && values[config.section][config.name]} />;
        case 'select':
            return <CustomSelect id={`${config.section}.${config.name}`} name={`${config.section}.${config.name}`} onChange={handleChange} value={values[config.section] && values[config.section][config.name]} />;
        case 'multi_select':
            // Use your multi select component here
        default:
            return null;
    }
}
