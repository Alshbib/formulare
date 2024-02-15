import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from 'compnents/form/form';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

test('submits the form with user input', async () => {

  fetchMock.mockResponse(JSON.stringify({ success: true }));

  render(<Form blok={{ name: 'Name', email: 'E-Mail', phone: 'Telefon', message: 'Message', link: { url: 'SEND' } }} />);

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Mahmoud' } });
  fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: 'mahmoud.alshbib@macaw.net' } });
  fireEvent.change(screen.getByLabelText(/Telefon/i), { target: { value: '0202123' } });
  fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Das ist ein Test' } });
  fireEvent.change(screen.getByLabelText(/P/i), { target: { value: true } });
  fireEvent.click(screen.getByLabelText(/Datenschutzbestimmungen/i));
  fireEvent.click(screen.getByRole('button', { type: /SEND/i }));

});









// ///////////////////////////////////////////////

// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Form from 'compnents/form/form';
// import fetchMock from 'jest-fetch-mock';


// fetchMock.enableMocks();

// test('submits the form with user input', async () => {

//   fetchMock.mockResponseOnce(JSON.stringify({ success: true }));


//   fetchMock.mockResponseOnce(JSON.stringify({ storyblokSuccess: true }));

//   render(
//     <Form
//       blok={{
//         name: 'Name',
//         email: 'E-Mail',
//         phone: 'Telefon',
//         message: 'Nachricht',
//         link: { url: 'SEND' },
//       }}
//     />
//   );

//   fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Mahmoud' } });
//   fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: 'mahmoud.alshbib@macaw.net' } });
//   fireEvent.change(screen.getByLabelText(/Telefon/i), { target: { value: '0202123' } });
//   fireEvent.change(screen.getByLabelText(/Nachricht/i), { target: { value: 'Das ist ein Test' } });
//   fireEvent.click(screen.getByLabelText(/Datenschutzbestimmungen/i));
//   fireEvent.click(screen.getByRole('button', { type: /SEND/i }));

//   const successMessage = await screen.findByText(/Formulardaten erfolgreich an den eigenen Server und Storyblok gesendet!/i);


//   expect(successMessage).toBeInTheDocument();

//   expect(fetchMock).toHaveBeenCalledWith('/send-email', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: 'Mahmoud',
//       email: 'mahmoud.alshbib@macaw.net',
//       phone: '0202123',
//       message: 'Das ist ein Test',
//     }),
//   });

//   expect(fetchMock).toHaveBeenCalledWith('/save-form', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: 'Mahmoud',
//       email: 'mahmoud.alshbib@macaw.net',
//       phone: '0202123',
//       message: 'Das ist ein Test',
//     }),
//   });
// });





// //////////////////////////////////////////////////////////////////////

// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import Form from 'compnents/form/form';
// import fetchMock from 'jest-fetch-mock';
// import { POST } from 'app/send-email'; // Bitte passen Sie den Pfad an


// fetchMock.enableMocks();


// jest.mock('nodemailer', () => ({
//   createTransport: jest.fn(() => ({
//     sendMail: jest.fn(() => Promise.resolve()),
//   })),
// }));


// jest.mock('mssql', () => {
//   const mockPool = {
//     connect: jest.fn(() => Promise.resolve({ query: jest.fn() })),
//     query: jest.fn(),
//     close: jest.fn(),
//   };

//   return {
//     ConnectionPool: jest.fn(() => mockPool),
//     close: jest.fn(),
//   };
// });

// test('submits the form with user input', async () => {

//   fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

//   render(<Form />); 

//   fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Mahmoud' } });
//   fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: 'mahmoud.alshbib@macaw.net' } });
//   fireEvent.change(screen.getByLabelText(/Telefon/i), { target: { value: '0202123' } });
//   fireEvent.change(screen.getByLabelText(/Nachricht/i), { target: { value: 'Das ist ein Test' } });
//   fireEvent.click(screen.getByLabelText(/Datenschutzbestimmungen/i));
//   fireEvent.click(screen.getByRole('button', { type: /SEND/i }));

//   await waitFor(() => {
//     expect(screen.queryByText(/Formulardaten erfolgreich an den eigenen Server und Storyblok gesendet!/i)).toBeDefined();
//   });

//   expect(fetchMock).toHaveBeenCalledWith('/send-email', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: 'Mahmoud',
//       email: 'mahmoud.alshbib@macaw.net',
//       phone: '0202123',
//       message: 'Das ist ein Test',
//     }),
//   });


 


//   expect(require('mssql').ConnectionPool).toHaveBeenCalled();
//   expect(require('mssql').close).toHaveBeenCalled();
// });
