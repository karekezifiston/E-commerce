import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_products] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);      // Track errors

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch all products
                const productsResponse = await fetch('https://shop-eco-backend.onrender.com/allproducts');
                if (!productsResponse.ok) {
                    throw new Error(`Error fetching products: ${productsResponse.status}`);
                }
                const productsData = await productsResponse.json();
                setAll_products(productsData);

                // Fetch cart if user is logged in
                if (localStorage.getItem('auth-token')) {
                    const cartResponse = await fetch('https://shop-eco-backend.onrender.com/getcart', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({}),
                    });
                    if (!cartResponse.ok) {
                        throw new Error(`Error fetching cart: ${cartResponse.status}`);
                    }
                    const cartData = await cartResponse.json();
                    setCartItems(cartData);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);  // Runs once when the component is mounted

    const addToCart = async (itemId) => {
        // Optimistically update the state
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch('https://shop-eco-backend.onrender.com/addtocart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                });

                if (!response.ok) {
                    throw new Error(`Error adding to cart: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);  // Handle success message
            } catch (error) {
                setError(error.message);
                console.error('Error adding to cart:', error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        // Optimistically update the state
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch('https://shop-eco-backend.onrender.com/removefromcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                });

                if (!response.ok) {
                    throw new Error(`Error removing from cart: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);  // Handle success message
            } catch (error) {
                setError(error.message);
                console.error('Error removing from cart:', error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {loading ? <div>Loading...</div> : (error ? <div>Error: {error}</div> : props.children)}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
