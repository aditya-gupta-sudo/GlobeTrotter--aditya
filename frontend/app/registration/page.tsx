"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function RegistrationPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    additionalInfo: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    // Backend/database connection can be added here later.
    console.log("Registration Data:", formData);
  };

  return (
    <main className="registration-page">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar">

        <Link href="/" className="brand">

          <div className="brand-icon">
            ◇
          </div>

          <span className="brand-name">
            Globe<span>Trotter</span>
          </span>

        </Link>


        <div className="nav-links">

          <Link href="/explore">
            Explore
          </Link>

          <Link href="/destinations">
            Destinations
          </Link>

          <Link href="/experiences">
            Experiences
          </Link>

          <Link href="/inspiration">
            Inspiration
          </Link>

          <Link href="/login">
            My account
          </Link>

        </div>


        <div className="nav-actions">

          <button className="search-button" aria-label="Search">
            <span />
          </button>

          <Link href="/explore" className="plan-button">
            Plan a trip
          </Link>

        </div>

      </nav>


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="intro">

        <div className="eyebrow">
          <span />
          JOIN THE JOURNEY
        </div>

        <h1>
          Your next adventure
          <br />

          <span>
            starts here.
          </span>
        </h1>

        <p>
          Create your GlobeTrotter account and keep every
          journey, destination, and unforgettable experience
          in one beautiful place.
        </p>

      </section>


      {/* =====================================================
          REGISTRATION CARD
      ===================================================== */}

      <section className="registration-wrapper">

        <div className="registration-card">


          {/* =================================================
              CARD HEADER
          ================================================= */}

          <div className="card-header">

            <div>
              <div className="small-label">
                CREATE YOUR PROFILE
              </div>

              <h2>
                Tell us about you.
              </h2>

              <p>
                A few details and you&apos;re ready to start
                exploring.
              </p>
            </div>

            <div className="step-indicator">
              <span>01</span>
              <div />
              <span>01</span>
            </div>

          </div>


          {/* =================================================
              PROFILE PHOTO
          ================================================= */}

          <div className="profile-section">

            <label
              htmlFor="photo-upload"
              className="photo-upload"
            >

              {photo ? (
                <img
                  src={photo}
                  alt="Profile preview"
                  className="profile-image"
                />
              ) : (
                <div className="photo-placeholder">

                  <div className="camera-icon">
                    +
                  </div>

                  <span>
                    Add photo
                  </span>

                </div>
              )}

              <div className="photo-edit">
                +
              </div>

            </label>

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden-input"
            />

            <div className="photo-info">
              <strong>Profile photo</strong>
              <span>
                Optional · JPG, PNG up to 5MB
              </span>
            </div>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            <div className="form-grid">


              {/* FIRST NAME */}

              <div className="field">

                <label htmlFor="firstName">
                  First name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* LAST NAME */}

              <div className="field">

                <label htmlFor="lastName">
                  Last name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="field">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* PHONE */}

              <div className="field">

                <label htmlFor="phone">
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CITY */}

              <div className="field">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Where are you from?"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* COUNTRY */}

              <div className="field">

                <label htmlFor="country">
                  Country
                </label>

                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select your country
                  </option>

                  <option value="India">
                    India
                  </option>

                  <option value="United States">
                    United States
                  </option>

                  <option value="United Kingdom">
                    United Kingdom
                  </option>

                  <option value="Canada">
                    Canada
                  </option>

                  <option value="Australia">
                    Australia
                  </option>

                  <option value="Germany">
                    Germany
                  </option>

                  <option value="France">
                    France
                  </option>

                  <option value="Japan">
                    Japan
                  </option>

                  <option value="Singapore">
                    Singapore
                  </option>

                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* ADDITIONAL INFORMATION */}

              <div className="field full-width">

                <label htmlFor="additionalInfo">
                  Additional information
                </label>

                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Tell us about your travel interests, dream destinations, or anything else you'd like us to know..."
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* =================================================
                TERMS
            ================================================= */}

            <div className="terms">

              <span className="check-mark">
                ✓
              </span>

              <p>
                By creating an account, you agree to
                GlobeTrotter&apos;s terms and privacy policy.
              </p>

            </div>


            {/* =================================================
                SUBMIT
            ================================================= */}

            <div className="submit-row">

              <Link
                href="/"
                className="back-button"
              >
                ← Back home
              </Link>

              <button
                type="submit"
                className="register-button"
              >
                <span>
                  Create account
                </span>

                <span className="arrow">
                  →
                </span>
              </button>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {submitted && (
              <div className="success-message">

                <div className="success-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    You&apos;re ready to explore.
                  </strong>

                  <p>
                    Your registration information has been
                    received.
                  </p>
                </div>

              </div>
            )}

          </form>

        </div>

      </section>


      {/* =====================================================
          FOOTER TEXT
      ===================================================== */}

      <div className="bottom-text">
        <span>GLOBETROTTER</span>
        <span>TRAVEL DIFFERENTLY</span>
      </div>


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        /* ============================================
           PAGE
        ============================================ */

        .registration-page {
          min-height: 100vh;
          background: #f5f4f0;
          color: #182331;
          font-family: Arial, Helvetica, sans-serif;
          position: relative;
          overflow: hidden;
          padding-bottom: 60px;
        }


        /* ============================================
           BACKGROUND
        ============================================ */

        .background-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }

        .glow-one {
          width: 500px;
          height: 500px;
          background: rgba(20, 171, 221, 0.08);
          top: 50px;
          right: -200px;
        }

        .glow-two {
          width: 400px;
          height: 400px;
          background: rgba(20, 171, 221, 0.05);
          bottom: -150px;
          left: -150px;
        }


        /* ============================================
           NAVBAR
        ============================================ */

        .navbar {
          width: calc(100% - 80px);
          max-width: 1700px;
          margin: 0 auto;
          height: 100px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          position: relative;
          z-index: 10;
        }


        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          color: #182331;
        }


        .brand-icon {
          width: 50px;
          height: 50px;
          border: 1px solid #182331;
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 25px;
          transform: rotate(45deg);
        }


        .brand-name {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.7px;
        }


        .brand-name span {
          color: #12a9dc;
        }


        /* ============================================
           NAV LINKS
        ============================================ */

        .nav-links {
          display: flex;
          align-items: center;
          gap: 40px;

          padding: 15px 32px;

          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(24, 35, 49, 0.09);
          border-radius: 50px;

          backdrop-filter: blur(15px);
        }


        .nav-links a {
          color: #263342;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;

          transition: 0.2s ease;
        }


        .nav-links a:hover {
          color: #12a9dc;
        }


        /* ============================================
           NAV ACTIONS
        ============================================ */

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }


        .search-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;

          border: 1px solid #182331;
          background: transparent;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
        }


        .search-button span {
          width: 17px;
          height: 17px;

          border: 2px solid #182331;
          border-radius: 50%;

          position: relative;
        }


        .search-button span::after {
          content: "";
          width: 7px;
          height: 2px;

          background: #182331;

          position: absolute;
          right: -5px;
          bottom: -3px;

          transform: rotate(45deg);
        }


        .plan-button {
          padding: 16px 26px;

          background: #ffffff;
          color: #182331;

          border-radius: 40px;

          text-decoration: none;
          font-size: 15px;
          font-weight: 700;

          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);

          transition: 0.25s ease;
        }


        .plan-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }


        /* ============================================
           INTRO
        ============================================ */

        .intro {
          width: calc(100% - 120px);
          max-width: 1500px;

          margin: 70px auto 55px;

          position: relative;
          z-index: 2;
        }


        .eyebrow {
          display: flex;
          align-items: center;
          gap: 18px;

          color: #0ca7d9;

          font-size: 14px;
          font-weight: 800;

          letter-spacing: 4px;

          margin-bottom: 25px;
        }


        .eyebrow span {
          width: 55px;
          height: 3px;
          background: #12a9dc;
        }


        .intro h1 {
          font-size: clamp(55px, 7vw, 100px);
          line-height: 0.92;

          letter-spacing: -5px;

          margin: 0;

          font-weight: 800;
        }


        .intro h1 span {
          color: #12a9dc;
        }


        .intro p {
          max-width: 650px;

          font-size: 19px;
          line-height: 1.65;

          color: #607286;

          margin-top: 30px;
        }


        /* ============================================
           REGISTRATION WRAPPER
        ============================================ */

        .registration-wrapper {
          width: calc(100% - 120px);
          max-width: 1500px;

          margin: 0 auto;

          position: relative;
          z-index: 2;
        }


        /* ============================================
           REGISTRATION CARD
        ============================================ */

        .registration-card {
          background: #ffffff;

          border-radius: 30px;

          padding: 50px;

          border: 1px solid rgba(24, 35, 49, 0.07);

          box-shadow:
            0 30px 80px rgba(24, 35, 49, 0.08);

          position: relative;
        }


        /* ============================================
           CARD HEADER
        ============================================ */

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          padding-bottom: 35px;

          border-bottom: 1px solid #e8e9e6;

          margin-bottom: 35px;
        }


        .small-label {
          color: #0ca7d9;

          font-size: 12px;
          font-weight: 800;

          letter-spacing: 3px;

          margin-bottom: 12px;
        }


        .card-header h2 {
          font-size: 36px;
          letter-spacing: -1.5px;

          margin: 0 0 8px;

          font-weight: 800;
        }


        .card-header p {
          color: #788594;
          margin: 0;

          font-size: 15px;
        }


        /* ============================================
           STEP INDICATOR
        ============================================ */

        .step-indicator {
          display: flex;
          align-items: center;
          gap: 12px;

          color: #12a9dc;

          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
        }


        .step-indicator div {
          width: 50px;
          height: 1px;
          background: #cbd7dc;
        }


        .step-indicator span:last-child {
          color: #a7b0b5;
        }


        /* ============================================
           PROFILE PHOTO
        ============================================ */

        .profile-section {
          display: flex;
          align-items: center;

          gap: 22px;

          margin-bottom: 35px;
        }


        .photo-upload {
          width: 105px;
          height: 105px;

          border-radius: 50%;

          background: #eef7fa;

          border: 2px dashed #9dd9eb;

          cursor: pointer;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: visible;

          transition: 0.25s ease;
        }


        .photo-upload:hover {
          border-color: #12a9dc;
          transform: scale(1.03);
          background: #e8f5f9;
        }


        .photo-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;

          color: #159dca;

          font-size: 12px;
          font-weight: 700;
        }


        .camera-icon {
          width: 28px;
          height: 28px;

          border: 1.5px solid #12a9dc;
          border-radius: 8px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
        }


        .profile-image {
          width: 100%;
          height: 100%;

          object-fit: cover;

          border-radius: 50%;
        }


        .photo-edit {
          width: 27px;
          height: 27px;

          border-radius: 50%;

          background: #12a9dc;
          color: white;

          position: absolute;

          bottom: 0;
          right: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;

          border: 3px solid white;
        }


        .hidden-input {
          display: none;
        }


        .photo-info {
          display: flex;
          flex-direction: column;

          gap: 6px;
        }


        .photo-info strong {
          font-size: 15px;
        }


        .photo-info span {
          font-size: 13px;
          color: #8a949c;
        }


        /* ============================================
           FORM
        ============================================ */

        .form-grid {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 25px;
        }


        .field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }


        .field.full-width {
          grid-column: 1 / -1;
        }


        .field label {
          font-size: 13px;

          font-weight: 700;

          color: #344354;

          letter-spacing: 0.2px;
        }


        .field input,
        .field select,
        .field textarea {
          width: 100%;

          border: 1px solid #d8dedf;

          background: #fafbf9;

          color: #1c2937;

          border-radius: 12px;

          padding: 15px 17px;

          font-family: inherit;

          font-size: 15px;

          outline: none;

          transition: 0.25s ease;
        }


        .field input,
        .field select {
          height: 53px;
        }


        .field textarea {
          min-height: 135px;

          resize: vertical;
        }


        .field input::placeholder,
        .field textarea::placeholder {
          color: #a1aab0;
        }


        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          background: #ffffff;

          border-color: #12a9dc;

          box-shadow:
            0 0 0 4px rgba(18, 169, 220, 0.08);
        }


        .field select {
          appearance: none;

          background-image:
            linear-gradient(45deg, transparent 50%, #64737b 50%),
            linear-gradient(135deg, #64737b 50%, transparent 50%);

          background-position:
            calc(100% - 20px) 23px,
            calc(100% - 14px) 23px;

          background-size:
            6px 6px,
            6px 6px;

          background-repeat: no-repeat;

          padding-right: 40px;
        }


        /* ============================================
           TERMS
        ============================================ */

        .terms {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-top: 25px;

          color: #788590;

          font-size: 13px;
        }


        .terms p {
          margin: 0;
        }


        .check-mark {
          width: 20px;
          height: 20px;

          border-radius: 50%;

          background: #e4f6fb;

          color: #12a9dc;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 12px;
          font-weight: 800;

          flex-shrink: 0;
        }


        /* ============================================
           SUBMIT ROW
        ============================================ */

        .submit-row {
          display: flex;

          justify-content: space-between;

          align-items: center;

          margin-top: 35px;

          padding-top: 30px;

          border-top: 1px solid #e8e9e6;
        }


        .back-button {
          color: #566575;

          text-decoration: none;

          font-size: 14px;
          font-weight: 700;

          transition: 0.2s ease;
        }


        .back-button:hover {
          color: #12a9dc;
        }


        .register-button {
          border: none;

          background: #12a9dc;

          color: white;

          padding: 16px 25px 16px 28px;

          border-radius: 50px;

          display: flex;
          align-items: center;
          gap: 25px;

          font-family: inherit;

          font-size: 15px;

          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 10px 25px rgba(18, 169, 220, 0.2);

          transition: 0.25s ease;
        }


        .register-button:hover {
          background: #0796c5;

          transform: translateY(-2px);

          box-shadow:
            0 15px 30px rgba(18, 169, 220, 0.27);
        }


        .arrow {
          width: 30px;
          height: 30px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.2);

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
        }


        /* ============================================
           SUCCESS MESSAGE
        ============================================ */

        .success-message {
          margin-top: 25px;

          display: flex;
          align-items: center;

          gap: 14px;

          padding: 18px;

          border-radius: 14px;

          background: #eef9f3;

          border: 1px solid #c8ead6;

          color: #28754b;
        }


        .success-icon {
          width: 34px;
          height: 34px;

          border-radius: 50%;

          background: #39ae6c;

          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-weight: 800;
        }


        .success-message strong {
          font-size: 14px;
        }


        .success-message p {
          margin: 3px 0 0;

          font-size: 12px;

          color: #5b8b6d;
        }


        /* ============================================
           BOTTOM TEXT
        ============================================ */

        .bottom-text {
          width: calc(100% - 120px);
          max-width: 1500px;

          margin: 35px auto 0;

          display: flex;
          justify-content: space-between;

          color: #9aa3a8;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 3px;
        }


        /* ============================================
           TABLET
        ============================================ */

        @media (max-width: 1100px) {

          .nav-links {
            gap: 20px;
            padding: 13px 22px;
          }

          .nav-links a {
            font-size: 13px;
          }

          .intro,
          .registration-wrapper,
          .bottom-text {
            width: calc(100% - 60px);
          }

        }


        /* ============================================
           MOBILE
        ============================================ */

        @media (max-width: 800px) {

          .navbar {
            width: calc(100% - 35px);
            height: 80px;
          }


          .nav-links {
            display: none;
          }


          .brand-name {
            font-size: 19px;
          }


          .brand-icon {
            width: 42px;
            height: 42px;
          }


          .search-button {
            display: none;
          }


          .plan-button {
            padding: 13px 18px;
            font-size: 13px;
          }


          .intro {
            width: calc(100% - 35px);
            margin-top: 50px;
            margin-bottom: 40px;
          }


          .intro h1 {
            font-size: 55px;
            letter-spacing: -3px;
          }


          .intro p {
            font-size: 16px;
          }


          .registration-wrapper {
            width: calc(100% - 35px);
          }


          .registration-card {
            padding: 28px 22px;
            border-radius: 22px;
          }


          .card-header {
            flex-direction: column;
            gap: 25px;
          }


          .card-header h2 {
            font-size: 30px;
          }


          .form-grid {
            grid-template-columns: 1fr;
          }


          .field.full-width {
            grid-column: auto;
          }


          .submit-row {
            flex-direction: column-reverse;
            gap: 20px;
            align-items: stretch;
          }


          .register-button {
            justify-content: space-between;
          }


          .back-button {
            text-align: center;
          }


          .bottom-text {
            width: calc(100% - 35px);
          }

        }


        /* ============================================
           SMALL MOBILE
        ============================================ */

        @media (max-width: 480px) {

          .intro h1 {
            font-size: 44px;
          }


          .eyebrow {
            font-size: 11px;
            letter-spacing: 2.5px;
          }


          .eyebrow span {
            width: 35px;
          }


          .registration-card {
            padding: 23px 17px;
          }


          .profile-section {
            align-items: flex-start;
          }


          .bottom-text {
            font-size: 8px;
            letter-spacing: 2px;
          }

        }

      `}</style>

    </main>
  );
}