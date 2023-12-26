import ClayDatePicker from '@clayui/date-picker';
import { getLanguageId, spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';
import { getDays, getMonths } from '../DatesLang';

export const Dateinput = ({itemsHandle, field, item}) => {

    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.key}>{field.label}</label>
        <ClayDatePicker
          onChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val }); }}
          id={field.name}
          placeholder={field.placeholder}
          firstDayOfWeek={1}
          months={getMonths(getLanguageId())}
          spritemap={spritemap}
          timezone="GMT+01:00"
          value={item}
          weekdaysShort={getDays(getLanguageId())}
          key={"dtpkr" + field.key}
          years={{
            end: (((new Date().getFullYear()) + field.yearmax)),
            start: ((new Date().getFullYear() - field.yearmin))
          }}
        />
      </>

    )


}