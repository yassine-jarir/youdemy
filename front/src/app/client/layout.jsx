import Navbar from './Navbar.jsx/Navbar';

export default async function RootLayout({ children }) {
  return (
    <>
      <main className="pointer-events-auto">
        <Navbar />
        {children}
      </main>
    </>
  );
}
