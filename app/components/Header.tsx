import Link from 'next/link';
import SearchBox from './SearchBox.client'; // Ajuste o caminho conforme necessário

const Header = () => {
  return (
    <header className="bg-blue-500 text-white w-full fixed top-0 z-50 h-12 flex items-center justify-between px-4">
      {/* Botão Página Inicial à Esquerda */}
      <div className="flex items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white hover:text-blue-200 mr-4">Página Inicial</a>
        </Link>
        {/* Incorporando SearchBox */}
        <SearchBox />
      </div>
    </header>
  );
};

export default Header;
