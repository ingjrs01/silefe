import ClayForm from '@clayui/form';
import React from "react";
import { spritemap } from '../LiferayFunctions';
import { Dateinput } from './fields/Dateinput';
import { Dni } from './fields/Dni';
import { DoubleList } from './fields/DoubleList';
import { Email } from './fields/Email';
import { Fileinput } from './fields/Fileinput';
import { Hour } from './fields/Hour';
import { LocalizedInput } from './fields/LocalizedInput';
import { Money } from './fields/Money';
import { Multilist } from './fields/Multilist';
import { Number } from './fields/Number';
import { Percent } from './fields/Percent';
import { Phone } from './fields/Phone';
import { Radio } from './fields/Radio';
import { Select } from './fields/Select';
import { Selectfilter } from './fields/Selectfilter';
import { Textarea } from './fields/Textarea';
import { Textinput } from './fields/Textinput';
import { Toggle } from './fields/Toggle';

const RenderFields = ({ rows, itemsHandle, items, plugin }) => (
    <>
      {rows.map(row => (
          <div className="row">
            {row.cols.map(it => (
                  <ClayForm.Group
                    className={`${items.errors[it] != 'undefined' && items.errors[it].length > 0 ? 'has-error' : 'has-success'} ${(items.fields.fields[it].hasOwnProperty('className')) ? items.fields.fields[it].className : 'col'} `}
                    key={"Group-" + items.fields.fields[it].key} >
                    {(items.fields.fields[it].type === 'multitext')   && <Phone          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'text')        && <Textinput      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'textarea')    && <Textarea       itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'percent')     && <Percent        itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'number')      && <Number         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'money')       && <Money          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'hour')        && <Hour           itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'phone')       && <Phone          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'email')       && <Email          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'date')        && <Dateinput      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'dni')         && <Dni            itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} tipoDoc={items.item["tipoDoc"]} /> }
                    {(items.fields.fields[it].type === 'select')      && <Select         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'toggle')      && <Toggle         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'file')        && <Fileinput      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'radio')       && <Radio          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]}  />}
                    {(items.fields.fields[it].type === 'multilang')   && <LocalizedInput itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]}  />}
                    {(items.fields.fields[it].type === 'multilist')   && <Multilist      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]}  />}
                    {(items.fields.fields[it].type === 'doublelist')  && <DoubleList     itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]}  />}
                    {(items.fields.fields[it].type === 'selectfilter')&& <Selectfilter   itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]}  />}
                    {(items.fields.fields[it].type === 'other')       && <> { plugin()[items.fields.fields[it].componentName] } </> }
                    {
                      items.errors[it] != 'undefined' && items.errors[it].length > 0 &&
                      <ClayForm.FeedbackGroup key={"error" + it}>
                        <ClayForm.FeedbackItem key={"err" + it}>
                          <ClayForm.FeedbackIndicator key={"erfi" + it} spritemap={spritemap} symbol="check-circle-full" />{items.errors[it][0]} </ClayForm.FeedbackItem>
                      </ClayForm.FeedbackGroup>
                    }
                  </ClayForm.Group>
            ))}
          </div>
        ))}
    </> )

export default RenderFields;
