import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputByComponentType(getControllerItem) {
    let element = null;
    const value = formData[getControllerItem.name];

    switch (getControllerItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControllerItem.name}
            placeholder={getControllerItem.placeholder}
            id={getControllerItem.name}
            type={getControllerItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControllerItem.name]: event.target.value.trim(),
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControllerItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControllerItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControllerItem.options && getControllerItem.options.length > 0
                ? getControllerItem.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControllerItem.name}
            placeholder={getControllerItem.placeholder}
            id={getControllerItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControllerItem.name]: event.target.value.trim(),
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControllerItem.name}
            placeholder={getControllerItem.placeholder}
            id={getControllerItem.name}
            type={getControllerItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControllerItem.name]: event.target.value.trim(),
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controllerItem) => (
          <div className="grid w-full gap-1.5" key={controllerItem.name}>
            <Label className="mb-1">{controllerItem.label}</Label>
            {renderInputByComponentType(controllerItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
