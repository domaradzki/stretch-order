import React from 'react'
import { Form } from 'semantic-ui-react'

const FormOrder = () => (
  <Form>
    <Form.Group>
      <Form.Input label='Klient' placeholder='Klient' width={6} />
      <Form.Input label='Towar' placeholder='Towar' width={3} />
      <Form.Input label='Faktura' placeholder='Faktura' width={3} />
      <Form.Input label='Data płatności' placeholder='Data płatności' width={4} />
    </Form.Group>
    <Form.Group>
    <Form.Input label='Ilość' placeholder='Ilość' width={4} />
      <Form.Input label='Cena' placeholder='Cena' width={4} />
      <Form.Input label='Wartość' placeholder='Wartość' width={4} />
      <Form.Input label='Marża' placeholder='Marża' width={4} />
    </Form.Group>
    <Form.Group>
    <Form.Input label='Uwagi' placeholder='Uwagi' width={16} />
    </Form.Group>
  </Form>
)

export default FormOrder