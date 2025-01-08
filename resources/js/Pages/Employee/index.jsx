import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employees', { search });
    };

    const handlePagination = (url) => {
        if (url) {
            // Append the search query to the pagination URL
            const updatedUrl = new URL(url);
            updatedUrl.searchParams.set('search', search);
            router.get(updatedUrl.toString());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Employee List</h1>
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Search employees..."
                    aria-label="Search employees"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>

            {employees.data.length > 0 ? (
                <div className="w-full max-w-4xl">
                    <table className="w-full border-collapse border border-gray-300 text-center">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">First Name</th>
                                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                                <th className="border border-gray-300 px-4 py-2">Birth Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.data.map((employee) => (
                                <tr key={employee.emp_no} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{employee.emp_no}</td>
                                    <td className="border border-gray-300 px-4 py-2">{employee.first_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{employee.last_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{employee.birth_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => handlePagination(employees.prev_page_url)}
                            disabled={!employees.prev_page_url}
                            className={`px-4 py-2 rounded font-medium shadow ${employees.prev_page_url
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Previous page"
                        >
                            Previous
                        </button>
                        <span className="text-gray-600 font-medium">
                            Page {employees.current_page} of {employees.last_page}
                        </span>
                        <button
                            onClick={() => handlePagination(employees.next_page_url)}
                            disabled={!employees.next_page_url}
                            className={`px-4 py-2 rounded font-medium shadow ${employees.next_page_url
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-6">Employees Not found.</p>
            )}
        </div>
    );
}
