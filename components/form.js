import React, { useState, useEffect } from 'react';
import { Button, FieldLabel, TextInput, Textarea, Checkbox, Heading } from '@contentstack/venus-components';
import { getFormQuery } from '../helper/index';

export default function PageForm(props) {
  const [data, setData] = useState(null);
  const { form_reference } = props.props;

  useEffect(() => {
      getFormQuery(form_reference[0].uid)
        .then((data) => {
          setData(data);
        })
    }, [])

  const getFieldType = (field) => {
    switch (field.system.content_type_uid) {
      case "field_type":
        return (
          <p className="formField">
            <FieldLabel>{field.title}</FieldLabel>
            <TextInput placeholder={field.placeholder} />
          </p>
        );
      case "textbox_field": 
        return (
          <p className="formField">
            <FieldLabel>{field.title}</FieldLabel>
            <Textarea placeholder={field.placeholder} />
          </p>
        )
      case "checkbox_field":
        return (
          <p className="formField">
            <Checkbox label={field.label} />
          </p>
        );
      default:
        return "";
    };
  }

  return (
    (data) && 
      <>
        <Heading tagName="h2" text={data.form.title} className="formHeading" />
        <p className="formDesc">{data.form.description}</p>
        <form className="customForm">
          {data.form.fields.map(field => {
            const fieldObj = field.field.referenceConnection.edges[0].node;
            return (
                getFieldType(fieldObj)
            );
          })}
          <Button
            buttonType="primary"
          >
            {data.form.submit_button_text}
          </Button>
        </form>
      </>
  );
}