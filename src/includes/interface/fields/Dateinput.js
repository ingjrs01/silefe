import ClayDatePicker from '@clayui/date-picker';
import ClayForm from '@clayui/form';
import { getLanguageId, spritemap } from '../../LiferayFunctions'; //   '../../LiferayFunctions';
import { validateDate2 } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';
import { getDays, getMonths } from '../DatesLang';

export const Dateinput = ({ itemsHandle, field, item, action, error }) => {

  const accion = (action !== undefined) ? action : ITEMS_ACTIONS.SET;
  
  const onChange = (value) => {
    validateDate2(field.name, value, field, itemsHandle);
    itemsHandle({ type: accion, fieldname: field.name, value: value });
  }

  return (
    <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `} 
        key={"Group-" + field.key} 
      >
        <label htmlFor="basicInput" key={"label" + field.key}>{field.label}</label>
        <ClayDatePicker
          onChange={val => onChange(val)}
          id={field.name}
          placeholder={field.placeholder}
          firstDayOfWeek={1}
          months={getMonths(getLanguageId())}
          spritemap={spritemap}
          timezone="GMT+01:00"
          value={item}
          weekdaysShort={getDays(getLanguageId())}
          //className={"col-12"}
          key={"dtpkr" + field.key}
          years={{
            end: (((new Date().getFullYear()) + field.yearmax)),
            start: ((new Date().getFullYear() - field.yearmin))
          }}
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