export default function UserDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Orders</h2>
                    <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">
                        Wishlist Items
                    </h2>
                    <p className="text-3xl font-bold">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Total Spent</h2>
                    <p className="text-3xl font-bold">$456</p>
                </div>
            </div>
        </div>
    );
}
