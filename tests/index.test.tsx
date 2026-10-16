import { render } from '@testing-library/react';
import Home from '../pages/index';

test('renders without crashing', ()=>{
  const { getByText } = render(<Home /> as any);
  expect(getByText(/Capital deserves/i)).toBeTruthy();
});
