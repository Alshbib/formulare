"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { FormStoryblok } from 'component-types-sb';
import { storyblokEditable } from '@storyblok/react';
export default function Form({ blok }: { blok: FormStoryblok }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [privacyPolicyError, setPrivacyPolicyError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePrivacyPolicyChange = () => {
    setPrivacyPolicyChecked(!privacyPolicyChecked);
  };

  const isFormValid = () => {
    const isNameValid = formData.name.trim() !== '';
    const isEmailValid = formData.email.trim() !== '';
    const isPhoneValid = formData.phone.trim() !== '';
    const isMessageValid = formData.message.trim() !== '';
    const isPrivacyPolicyChecked = privacyPolicyChecked;

    setNameError(isNameValid ? '' : 'Bitte geben Sie Ihren Namen ein.');
    setEmailError(isEmailValid ? '' : 'Bitte geben Sie Ihre E-Mail-Adresse ein.');
    setPhoneError(isPhoneValid ? '' : 'Bitte geben Sie Ihre Telefonnummer ein.');
    setMessageError(isMessageValid ? '' : 'Bitte geben Sie Ihre Nachricht ein.');
    setPrivacyPolicyError(isPrivacyPolicyChecked ? '' : 'Bitte akzeptieren Sie die Datenschutzbestimmungen.');

    return isNameValid && isEmailValid && isPhoneValid && isMessageValid && isPrivacyPolicyChecked;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isFormValid()) {
      console.log('Bitte korrigieren Sie die Formulareingaben.');
      return;
    }
    try {

      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        console.log('Formulardaten erfolgreich an deinen Server gesendet!');

        const storyData = await response.json();

        console.log('DATEN:');
        console.log(storyData);

        var storyblokResponse = await fetch('/save-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        console.log('sent');

        if (storyblokResponse.ok) {
          console.log('Formulardaten erfolgreich an Storyblok gesendet!');
        } else {
          console.error('Fehler beim Senden der Formulardaten an Storyblok');
        }
      } else {
        console.error('Fehler beim Senden der Formulardaten an deinen Server');
      }
    } catch (error) {
      console.error('Fehler beim Senden der Formulardaten:', error);
    }
  };

//////////////////////////////////////////////////////////

  return (
    <div {...storyblokEditable(blok)} >

      <div className="contact-form-container">
        <div className="contact-us">
          <div className="contact-header">
            <h1>
              &#9135;&#9135;&#9135;&#9135;&nbsp;&nbsp;CONTACT US
            </h1>
          </div>

        </div>
        <div className="header">
          <h1>Let's Get Started</h1>
          <h2>Contact us to start your next project!</h2>
        </div>

        <div className="contact-form">
          <form className="container" onSubmit={handleSubmit}>

            <div className="name block">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={blok.name}
                  autoComplete="name"
                  aria-label="Name"
                />
                {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
              </div>
            </div>

            <div className="email block">
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={blok.email}
                autoComplete="email"
                aria-label="E-Mail"
              />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </div>

            <div className="block phone">
              <label htmlFor="phone">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={blok.phone}
                autoComplete="tel"
                aria-label="Telefon"
              />
              {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
            </div>

            <div className="message block">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={blok.message}
                autoComplete="off"
                aria-label="Nachricht"
              ></textarea>
              {messageError && <p style={{ color: 'red' }}>{messageError}</p>}
            </div>

            <div className="privacy-policy block" style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="privacyPolicy" style={{ visibility: 'hidden' }}>P</label>
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                checked={privacyPolicyChecked}
                onChange={handlePrivacyPolicyChange}
                style={{ marginRight: '5px' }}
              />

              <div className="privacy-policy block" style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="privacyPolicy" style={{ visibility: 'hidden' }}>Privacy</label>
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={privacyPolicyChecked}
                  onChange={handlePrivacyPolicyChange}
                  style={{ marginRight: '5px' }}
                />
              </div>


              <label htmlFor="privacyPolicy">
                Wenn Sie auf Send klicken, erklären Sie sich mit unserer
                <a href={blok.link?.cached_url} target="_blank" rel="noopener noreferrer">
                  Datenschutzbestimmungen
                </a>
                einverstanden.
              </label>

            </div>
            {privacyPolicyError && <p style={{ color: 'red' }}>{privacyPolicyError}</p>}

            <div className='button block'>
              <button type="submit" aria-label="Submit">SEND</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


