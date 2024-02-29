import ClayForm from '@clayui/form';
import React from "react";
import { ITEMS_ACTIONS } from '../reducers/main.reducer';
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

export const RenderFormFields = ({ itemsHandle, items }) => {

  return (
  <>
    {items.form.rows.map(row => {
      //console.log("esto es una fila");
      //console.debug(row);
      return (
      <div className="row">
        {row.cols.map(it => {
          //console.log("esto es una columna: " + it);
          return (
          <ClayForm.Group
            className={` ${(items.form.fields[it].hasOwnProperty('className')) ? items.form.fields[it].className : 'col'} `}
            key={"Group-" + items.form.fields[it].key} >
            {(items.form.fields[it].type === 'multitext')    && <Phone          itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'text')         && <Textinput      itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'textarea')     && <Textarea       itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'percent')      && <Percent        itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'number')       && <Number         itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'money')        && <Money          itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'hour')         && <Hour           itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'phone')        && <Phone          itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'email')        && <Email          itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'date')         && <Dateinput      itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} />}
            {(items.form.fields[it].type === 'dni')          && <Dni            itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} tipoDoc={items.item["tipoDoc"]} />}
            {(items.form.fields[it].type === 'select')       && <Select         itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'toggle')       && <Toggle         itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'file')         && <Fileinput      itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'radio')        && <Radio          itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'multilang')    && <LocalizedInput itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'multilist')    && <Multilist      itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'doublelist')   && <DoubleList     itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {(items.form.fields[it].type === 'selectfilter') && <Selectfilter   itemsHandle={itemsHandle} field={items.form.fields[it]} item={items.item[it]} />}
            {/*
              items.errors[it] !== undefined && items.errors[it].length > 0 &&
              <ClayForm.FeedbackGroup key={"error" + it}>
                <ClayForm.FeedbackItem key={"err" + it}>
                  <ClayForm.FeedbackIndicator key={"erfi" + it} spritemap={spritemap} symbol="check-circle-full" />{items.errors[it][0]} </ClayForm.FeedbackItem>
              </ClayForm.FeedbackGroup>
          */}
          </ClayForm.Group>
        )})}
      </div>
    )})
          }
  </>
  )
}
