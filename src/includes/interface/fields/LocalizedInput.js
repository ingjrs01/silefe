import ClayForm from '@clayui/form';
import ClayLocalizedInput from '@clayui/localized-input';
import { useState } from 'react';
import { locales, spritemap } from '../../LiferayFunctions';
import { validateLocalized } from '../../Validators';

export const LocalizedInput = ({ itemsHandle, field, item, action, error }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);

  const onChange = (evt) => {
    console.log("cambiando");
    validateLocalized(field.name, evt, field, itemsHandle);
    itemsHandle({ type: action, fieldname: field.name, value: evt });
  }

  return (
    <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >
        <ClayLocalizedInput
          id={field.key}
          key={field.name + field.key}
          label={field.label}
          locales={locales}
          spritemap={spritemap}
          onSelectedLocaleChange={setSelectedLocale}
          onTranslationsChange={onChange}
          selectedLocale={selectedLocale}
          translations={item}
          onBlur={e => validateLocalized(field.name, item, field, itemsHandle)}
        />

        {
          error !== undefined && error.length > 0 &&
          <ClayForm.FeedbackGroup key={"error" + field.name}>
            <ClayForm.FeedbackItem key={"err" + field.name}>
              <ClayForm.FeedbackIndicator key={"erfi" + field.name} spritemap={spritemap} symbol="check-circle-full" />{error[0]} </ClayForm.FeedbackItem>
          </ClayForm.FeedbackGroup>
        }
      </ClayForm.Group>
    </>

  )
}