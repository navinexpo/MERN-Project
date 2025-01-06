/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {
  const renderInputByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || '';

    switch (getControlItem.componentType) {
      //input
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={e => setFormData({
                ...formData,
                [getControlItem.name] : e.target.value,
            })}
          />
        );
        break;

      // select
      case "select":
        element = (
          <Select onValueChange={(value)=> setFormData({
            ...formData,
            [getControlItem.name] : value
          })} value={value}>
            <SelectTrigger>
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;

      // text area
      case "textarea":
        element = (
          <Textarea 
          name={getControlItem.name}
          placeholder={getControlItem.placeholder}
          id={getControlItem.id}
          value={value}
          onChange = {e => setFormData({
            ...formData, 
            [getControlItem.name] : e.target.value
          }) }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={e => setFormData({
                ...formData,
                [getControlItem.name] : e.target.value,
            })}
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label className="mb-1">{controlItem.label}</label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <Button type="submit" className="mt-2 w-full ">{buttonText || 'Submit'}</Button>
    </form>
  );
};

export default CommonForm;
