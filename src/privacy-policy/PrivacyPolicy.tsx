import { FunctionComponent } from "react";

type PolicyTier = "pp" | "ppp" | "pps";

interface iPrivacyPolicyProps {
  app?: string;
  tier?: PolicyTier;
}

const H2 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2
    id={id}
    className={`font-bold text-xl mt-8 text-gray-700 dark:text-gray-300${id ? " scroll-mt-24" : ""}`}
  >
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4">{children}</p>
);

const PrivacyPolicy: FunctionComponent<iPrivacyPolicyProps> = ({
  app = "iOS App",
  tier = "pp",
}) => {
  return (
    <div className="flex-1 px-4 sm:px-8 max-w-4xl w-full mx-auto pt-16 text-lg font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-24">
      <h1 className="font-bold text-3xl text-gray-700 dark:text-gray-300">
        Privacy Policy for {app}
      </h1>
      <P>
        This privacy policy governs your use of the software application {app}{" "}
        (&ldquo;Application&rdquo;) for iOS devices created by Laszlo Tuss. Our
        privacy policy may change from time to time. If we make any material
        changes we will place a prominent notice on our website or application.
      </P>

      <H2>What information does the Application obtain and how is it used?</H2>
      <P>
        The Application does not collect or transmit any personally identifiable
        information about you, such as your name, address, phone number or email
        address.
      </P>

      {tier === "ppp" && (
        <>
          <H2>In-App Purchases</H2>
          <P>
            {app} is free to download. Certain features may be unlocked via a{" "}
            <strong>one-time in-app purchase</strong>. This purchase is
            non-recurring and does not expire &mdash; you pay once and the
            feature is yours permanently.
          </P>
          <P>
            All purchases are processed securely by Apple through the App Store.
            We do not collect, store, or have access to any payment or financial
            information. Your purchase is tied to your Apple ID and can be
            restored at any time using the &ldquo;Restore Purchases&rdquo;
            option in the app.
          </P>
        </>
      )}

      {tier === "pps" && (
        <>
          <H2>Subscription</H2>
          <P>
            {app} offers auto-renewable subscriptions. Payment is charged to
            your Apple ID account at confirmation of purchase. Subscriptions
            automatically renew unless auto-renew is turned off at least 24
            hours before the end of the current period. You can manage and
            cancel subscriptions in your App Store account settings.
          </P>
        </>
      )}

      <H2>How do you handle location data?</H2>
      <P>
        The Application does not use or collect any data related to your
        geographic location.
      </P>

      <H2>Can users see their personal data?</H2>
      <P>The Application itself does not collect, transmit, or maintain user data.</P>

      <H2>Do you share personal information?</H2>
      <P>
        As no personal information is collected, transmitted, or maintained by
        the Application, we do not share personal information with anyone.
      </P>

      {tier === "pps" && (
        <>
          <H2>Third-Party Services &amp; Data Collection</H2>
          <P>
            {app} integrates the following third-party services that may collect
            data as described below:
          </P>
          <P>
            <strong>RevenueCat</strong> &mdash; used for subscription management
            and purchase validation. RevenueCat may collect your App Store
            receipt, a pseudonymous user identifier, and subscription status in
            order to verify and manage your subscription. No personally
            identifiable information is shared with RevenueCat beyond what is
            required for this purpose. See RevenueCat&apos;s privacy policy at{" "}
            <a
              className="text-indigo-500 underline"
              href="https://www.revenuecat.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              revenuecat.com/privacy
            </a>
            .
          </P>
        </>
      )}

      <H2>Do advertising companies collect data?</H2>
      <P>
        The Application has no facility for collecting, transmitting, or
        maintaining user data, so no data is shared with advertising companies.
      </P>

      <H2>Do you use vendors or analytics providers?</H2>
      <P>
        No. The Application has no facility for collecting, transmitting, or
        maintaining user data, so no data is shared with vendors or analytics
        providers.
      </P>

      <H2>
        Do you comply with the Children&apos;s Online Privacy Protection Act
        (COPPA)?
      </H2>
      <P>
        Yes. We do not solicit nor gather any data from children under the age
        of 13. If a parent or guardian becomes aware that their child has
        provided us with information without their consent, please contact me.
      </P>

      <H2>Contact Me</H2>
      <P>If you have any questions about this Privacy Policy, please contact me:</P>
      <ul className="list-disc mt-2 ml-6">
        <li>
          By email:{" "}
          <a className="text-indigo-500 underline" href="mailto:laszlotuss@me.com">
            laszlotuss@me.com
          </a>
        </li>
        <li>
          By visiting my website:{" "}
          <a className="text-indigo-500 underline" href="https://laszlotuss.com">
            laszlotuss.com
          </a>
        </li>
      </ul>

      {/* Terms / EULA */}
      <h2
        id="terms"
        className="font-bold text-2xl mt-14 pt-8 border-t border-gray-200 dark:border-gray-700 scroll-mt-24 text-gray-700 dark:text-gray-300"
      >
        Terms of Use
      </h2>
      <P>
        By downloading or using {app} (the &ldquo;Application&rdquo;) you agree
        to these Terms of Use, which together with Apple&apos;s Licensed
        Application End-User License Agreement (EULA) govern your use of the
        Application. If you do not agree, please do not download or use the
        Application.
      </P>

      <H2>License</H2>
      <P>
        I grant you a limited, non-exclusive, non-transferable, revocable
        license to use the Application for your personal, non-commercial
        purposes on any Apple-branded device that you own or control, as
        permitted by the App Store Terms of Service.
      </P>

      {tier === "ppp" && (
        <>
          <H2>In-App Purchase</H2>
          <P>
            {app} is available free of charge. Certain premium features may be
            unlocked through a <strong>one-time in-app purchase</strong> made
            through Apple&apos;s App Store. The purchase is permanent,
            non-recurring, and non-expiring. Once purchased, unlocked features
            are tied to your Apple ID and can be restored on any device signed
            in with the same Apple ID. Laszlo Tuss does not process, store, or
            have access to any payment information.
          </P>
        </>
      )}

      {tier === "pps" && (
        <>
          <H2>Subscription</H2>
          <P>
            {app} may offer auto-renewable subscription options. Subscriptions
            are billed through Apple&apos;s App Store. You can manage or cancel
            your subscription at any time through your Apple ID account
            settings. No refunds are provided for the unused portion of a
            subscription period unless required by applicable law.
          </P>
        </>
      )}

      <H2>Restrictions</H2>
      <P>
        You may not copy, modify, distribute, sell, or lease any part of the
        Application, nor reverse engineer or attempt to extract its source code,
        unless laws prohibit these restrictions or you have written permission.
      </P>

      <H2>Disclaimer &amp; Limitation of Liability</H2>
      <P>
        The Application is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;, without warranties of any kind. To the maximum extent
        permitted by law, I am not liable for any indirect, incidental, or
        consequential damages arising from your use of, or inability to use, the
        Application.
      </P>

      <H2>Changes to These Terms</H2>
      <P>
        I may update these Terms from time to time. Continued use of the
        Application after any change constitutes your acceptance of the revised
        Terms.
      </P>

      <H2>Contact Me</H2>
      <P>
        If you have any questions about these Terms, please contact me at{" "}
        <a className="text-indigo-500 underline" href="mailto:laszlotuss@me.com">
          laszlotuss@me.com
        </a>
        .
      </P>
    </div>
  );
};

export default PrivacyPolicy;
