import { render } from '@testing-library/react'
import Form from '../form/form'

it('renders homepage unchanged', () => {
  const { container } = render(<Form />)
  expect(container).toMatchSnapshot()

})
