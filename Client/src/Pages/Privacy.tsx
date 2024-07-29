import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = ():React.ReactNode => {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-4xl font-extrabold text-center mb-8"><span className='text-pink-600'>P</span>rivacy <span className='text-pink-600'>P</span>olicy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Welcome to <a href="vehycle.vercel.app" className='text-pink-600' target='_blank'>Vehycle</a>. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
            <li>Derivative Data: Information our servers automatically collect when you access the Site, your browser type, your access times.</li>
            <li>Financial Data: Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Create and manage your account.</li>
            <li>Process your transactions and send you related information.</li>
            <li>Send you technical notifications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li>Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <address className="not-italic">
            <p><strong>Vehycle</strong></p>
            <Link className='font-semibold text-sm' to="https://meard.vercel.app" target='_blank'>Owner: <span className='text-pink-600'>Arunava Dutta</span></Link>
            <p>Email: <a href="mailto:meard06@gmail.com" className="text-sm text-pink-600 hover:underline">meard06@gmail.com</a></p>
          </address>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
