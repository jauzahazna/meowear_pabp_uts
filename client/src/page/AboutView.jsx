import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import customAPI from "../api";
import { FaArrowRight } from "react-icons/fa";

export const AboutView = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, sold: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await customAPI.get("/stats"); 
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // --- Animation Variants ---
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-hidden pb-24">
      
      {/* 1. HERO SECTION (Typography Focused - No Image) */}
      <section className="container mx-auto px-6 lg:px-12 pt-24 pb-24 lg:pt-32 lg:pb-32 flex justify-center text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl space-y-10"
        >
          <div>
            <p className="text-sm font-bold tracking-[0.4em] uppercase text-gray-500 mb-6">
              Tentang Kami
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
              MEOWEAR.
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl font-light leading-relaxed opacity-80 max-w-2xl mx-auto">
            Mendefinisikan ulang gaya jalanan dengan sentuhan elegan. 
            Kami menghadirkan kualitas premium, jahitan lokal terbaik, 
            dan pengalaman belanja yang aman untuk setiap individu yang berani tampil beda.
          </p>

          <div className="pt-8">
            <Link
              to="/product"
              className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] border-b-2 border-base-content pb-1 hover:text-gray-500 hover:border-gray-500 transition-all duration-300"
            >
              Eksplorasi Koleksi 
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="border-y border-base-300 bg-base-100">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6 lg:px-12 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-base-300 text-center">
            
            <motion.div variants={fadeUp} className="pt-6 md:pt-0">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Total Unduhan</p>
              <h3 className="text-5xl lg:text-6xl font-black tracking-tighter">
                <CountUp end={stats.users > 0 ? stats.users : 31000} duration={2.5} separator="," />+
              </h3>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-6 md:pt-0">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Pelanggan Aktif</p>
              <h3 className="text-5xl lg:text-6xl font-black tracking-tighter">
                <CountUp end={stats.users > 0 ? stats.users : 112} duration={3} separator="," />
              </h3>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-6 md:pt-0">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Produk Terjual</p>
              <h3 className="text-5xl lg:text-6xl font-black tracking-tighter">
                <CountUp end={stats.sold > 0 ? stats.sold : 1200} duration={2.5} separator="," />+
              </h3>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 3. OUR JOURNEY (Premium Timeline) */}
      <section className="container mx-auto px-6 lg:px-12 pt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-center mb-16">
            Perjalanan Kami
          </h2>
          
          <div className="space-y-12">
            <JourneyItem year="2025" title="The Beginning" desc="MEOWEAR resmi diluncurkan sebagai manifesto gaya urban modern." />
            <JourneyItem year="Now" title="Digital Expansion" desc="Memperluas jangkauan melalui kampanye digital dan kolaborasi lokal." />
            <JourneyItem year="2026" title="Market Leader" desc="Menjadi standar baru dalam industri fashion e-commerce Indonesia." isLast />
          </div>
        </motion.div>
      </section>

    </div>
  );
};

// Sub-component untuk Timeline
const JourneyItem = ({ year, title, desc, isLast = false }) => (
  <div className="flex gap-6 group">
    {/* Garis & Titik */}
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-base-content group-hover:scale-150 transition-transform duration-300"></div>
      {!isLast && <div className="w-[1px] h-full bg-base-300 mt-2"></div>}
    </div>
    
    {/* Konten */}
    <div className="pb-8 -mt-1.5">
      <h4 className="text-2xl font-black tracking-tight">{year}</h4>
      <h5 className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-1 mb-3">{title}</h5>
      <p className="font-light opacity-80">{desc}</p>
    </div>
  </div>
);