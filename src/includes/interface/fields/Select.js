import ClayForm, { ClaySelect } from '@clayui/form';
import { spritemap } from '../../LiferayFunctions';

export const Select = ({itemsHandle, field, item, className, action, error}) => {

    return (
      <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >
        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClaySelect aria-label="Select Label"
          id={field.name}
          name={field.name}
          key={field.key}
          disabled={!field.enabled}
          className={className}
          onChange={evt => itemsHandle({ type: action, fieldname: evt.target.name, value: evt.target.value })}
          value={item} >
          {field.options !== 'undefined' && field.options.map(item => (
            <ClaySelect.Option
              key={field.name + "o" + item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </ClaySelect>

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