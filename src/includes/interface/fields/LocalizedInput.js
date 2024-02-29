import ClayLocalizedInput from '@clayui/localized-input';
import { useState } from 'react';
import { locales, spritemap } from '../../LiferayFunctions';
import { validateLocalized } from '../../Validators';

export const LocalizedInput = ({itemsHandle, field, item, action }) => {
    const [selectedLocale, setSelectedLocale] = useState(locales[0]);

    return (
        <ClayLocalizedInput
        id={field.key}
        key={field.name + field.key}
        label={field.label}
        locales={locales}
        spritemap={spritemap}
        onSelectedLocaleChange={setSelectedLocale}
        onTranslationsChange={evt => {
          validateLocalized(field.name, evt, field, itemsHandle);
          itemsHandle({ type: action, fieldname: field.name, value: evt });
        }
        }
        selectedLocale={selectedLocale}
        translations={item}
      />

    )
}