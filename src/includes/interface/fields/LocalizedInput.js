import ClayLocalizedInput from '@clayui/localized-input';
import { useState } from 'react';
import { locales, spritemap } from '../../LiferayFunctions';
import { validateLocalized } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const LocalizedInput = ({itemsHandle, field, item}) => {
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
          validateLocalized(it, evt, field, itemsHandle);
          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: evt });
        }
        }
        selectedLocale={selectedLocale}
        translations={item}
      />

    )
}