import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen shadow-md bg-gray-800 text-white fixed">
            <ul className="mt-6">
                <li className="mt-3">
                    {/* Note como passamos a classe diretamente para o Link */}
                    <Link href="/" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                        {/* Removemos o <a> */}
                        <span className="ml-3">Home</span>
                    </Link>
                </li>
                {/* Adicione mais itens do menu conforme necessário */}
            </ul>
        </aside>
    );
};

export default Sidebar;
