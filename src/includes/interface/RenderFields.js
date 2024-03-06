import React from "react";
import { ITEMS_ACTIONS } from '../reducers/main.reducer';
import { Button } from './fields/Button';
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

const RenderFields = ({ rows, itemsHandle, items, plugin }) => {
  return (
    <div className="col-12">
      {rows.map(row => (
          <div className="row">
            {row.cols.map(it => (
              <>
                    {(items.fields.fields[it].type === 'multitext')   && <Phone          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'text')        && <Textinput      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'button')      && <Button         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'textarea')    && <Textarea       itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'percent')     && <Percent        itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'number')      && <Number         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'money')       && <Money          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'hour')        && <Hour           itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'phone')       && <Phone          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'email')       && <Email          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'date')        && <Dateinput      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"}/> }
                    {(items.fields.fields[it].type === 'dni')         && <Dni            itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} tipoDoc={items.item["tipoDoc"]} /> }
                    {(items.fields.fields[it].type === 'select')      && <Select         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} /> }
                    {(items.fields.fields[it].type === 'toggle')      && <Toggle         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} /> }
                    {(items.fields.fields[it].type === 'file')        && <Fileinput      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} /> }
                    {(items.fields.fields[it].type === 'radio')       && <Radio          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} />}
                    {(items.fields.fields[it].type === 'multilang')   && <LocalizedInput itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} />}
                    {(items.fields.fields[it].type === 'multilist')   && <Multilist      itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} />}
                    {(items.fields.fields[it].type === 'doublelist')  && <DoubleList     itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} />}
                    {(items.fields.fields[it].type === 'selectfilter')&& <Selectfilter   itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} action={ITEMS_ACTIONS.SET} error={items.errors[it]} key={items.fields.fields[it].key + "-f"} />}
                    {(items.fields.fields[it].type === 'other')       && <> { plugin()[items.fields.fields[it].componentName] } </> }
              </>
            ))}
          </div>
        ))}
    </div> )}

export default RenderFields;
