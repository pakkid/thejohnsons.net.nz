"use client"

import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

const UnderConstruction: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Johnsons | Under Construction</title>
        <meta name="description" content="my site is currently under construction. Check back soon!" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="container">
        <div className="content">
          <div className="icon">🏗️</div>
          <h1>Under Construction</h1>
          <div className="divider"></div>
          <p>I'm working on something awesome!</p>
          <p className="message">thejohnsons.net.nz is currently being rebuilt. 
            Check back soon for my new and improved site.</p>
        </div>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          height: 100vh;
          overflow: hidden;
        }
        
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 0 20px;
        }
        
        .content {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
          animation: fadeIn 1s ease-out;
        }
        
        .icon {
          font-size: 80px;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }
        
        h1 {
          color: #333;
          font-size: 36px;
          font-weight: 600;
          margin: 0;
        }
        
        .divider {
          height: 4px;
          width: 70px;
          background: linear-gradient(90deg, #007cf0, #00dfd8);
          margin: 20px auto;
          border-radius: 2px;
        }
        
        p {
          color: #666;
          font-size: 18px;
          margin: 10px 0;
        }
        
        .message {
          margin-top: 20px;
          font-size: 16px;
          line-height: 1.6;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @media (max-width: 600px) {
          .content {
            padding: 30px;
          }
          
          .icon {
            font-size: 60px;
          }
          
          h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default UnderConstruction;