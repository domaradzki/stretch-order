import React from 'react'
import { Form } from 'semantic-ui-react'

const FormOrder = () => (
  <Form>
    <Form.Group>
      <Form.Input name='client' label='Klient' placeholder='Klient' width={6} />
      <Form.Input name='kind' label='Towar' placeholder='Towar' width={3} />
      <Form.Input name='invoice' label='Faktura' placeholder='Faktura' width={3} />
      <Form.Input name='dateOfPay' label='Data płatności' placeholder='Data płatności' width={4} />
    </Form.Group>
    <Form.Group>
    <Form.Input name='quantity' label='Ilość' placeholder='Ilość' width={4} />
      <Form.Input name='price' label='Cena' placeholder='Cena' width={4} />
      <Form.Input name='netValue' label='Wartość' placeholder='Wartość' width={4} />
      <Form.Input name='margin' label='Marża' placeholder='Marża' width={4} />
    </Form.Group>
    <Form.Group>
    <Form.Input name='comments' label='Uwagi' placeholder='Uwagi' width={16} />
    </Form.Group>
  </Form>
)

export default FormOrder