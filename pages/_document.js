import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pl">
        <Head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANLYTICS_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga-script" strategy="lazyOnload">
            {` 
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', '${process.env.GOOGLE_ANLYTICS_ID}',{
          page_path: window.location.pathname
         });
        `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default CustomDocument;
