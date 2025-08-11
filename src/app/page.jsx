'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Flex, Typography, Row, Col, Card, Button, List, Skeleton, Space, Avatar, Collapse } from 'antd';
import { MailOutlined, LinkedinOutlined, GithubOutlined, UserOutlined, DownOutlined, MessageOutlined, BgColorsOutlined, CodeSandboxOutlined, RocketOutlined } from '@ant-design/icons';
import { TypeAnimation } from 'react-type-animation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Pastikan Anda sudah install: npm install react-icons
import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandVercel } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const { Title, Paragraph, Link } = Typography;

const colorPalette = { primary: '#f7b722', accent: '#e31f26', teal: '#45bfb4', text: '#E0E0E0', cardBg: 'rgba(40, 40, 40, 0.5)', headerBg: 'rgba(26, 26, 26, 0.8)' };

const packageData = [
  { title: 'Paket Starter', price: 'Mulai dari Rp X.XXX.XXX', features: ['Desain Landing Page Modern', 'Responsif di semua perangkat', 'Dikerjakan oleh 1 Developer', 'Konsultasi Desain (1 Sesi)', 'Waktu Pengerjaan: 2 Minggu'], buttonText: 'Pilih Paket', recommended: false },
  { title: 'Paket Bisnis', price: 'Mulai dari Rp XX.XXX.XXX', features: ['Situs Web hingga 5 Halaman', 'Integrasi Sistem Manajemen Konten (CMS)', 'Dikerjakan oleh 2 Developer', 'Optimisasi SEO Dasar', 'Waktu Pengerjaan: 4 Minggu'], buttonText: 'Paling Populer', recommended: true },
  { title: 'Paket Enterprise', price: 'Hubungi untuk Penawaran', features: ['Solusi Web Kompleks / Aplikasi Web', 'Fitur Kustom & Integrasi API', 'Tim Developer Khusus', 'Dukungan Prioritas & Maintenance', 'Waktu Pengerjaan: Sesuai Proyek'], buttonText: 'Konsultasi Sekarang', recommended: false },
];

const LandingPage = () => {
  const mainRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const [isHeaderVisible, setHeaderVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 80) setHeaderVisible(true);
      else setHeaderVisible(false);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.2 });

      const createScrollAnimation = (triggerSelector, targets) => {
        gsap.from(targets, { 
          opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: triggerSelector, start: 'top 85%', toggleActions: 'play none none none' }
        });
      };
      
      createScrollAnimation("#tentang", ".about-element");
      createScrollAnimation("#paket", ".package-card");
      createScrollAnimation("#workflow", ".workflow-step");
      createScrollAnimation("#tech-stack", ".tech-icon");
      createScrollAnimation("#faq", ".faq-item");
      createScrollAnimation("#kontak-cta", ".contact-element");

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(mainRef.current, {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
          
        gsap.to(horizontalScrollRef.current, {
            x: () => -(horizontalScrollRef.current.scrollWidth - mainRef.current.clientWidth),
            ease: "none",
            scrollTrigger: {
                trigger: "#portfolio-section",
                start: "top top",
                end: () => "+=" + (horizontalScrollRef.current.scrollWidth - mainRef.current.clientWidth),
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
            }
        });
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={mainRef} 
      style={{ 
        position: 'relative', 
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colorPalette.teal} -80%, #1A1A1A 40%), radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colorPalette.primary} -50%, #1A1A1A 30%)`,
        transition: 'background 0.2s ease-out',
      }}
    >
      <header style={{ position: 'fixed', top: isHeaderVisible ? '0' : '-100px', left: 0, width: '100%', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, background: colorPalette.headerBg, backdropFilter: 'blur(10px)', transition: 'top 0.4s ease-in-out' }}>
        <Image src="/logo-ln.png" alt="Logo L&N" width={40} height={40} />
        <Space size="large" className="desktop-nav">
          <Link href="#tentang" style={{ color: colorPalette.text }}>Tentang</Link>
          <Link href="#paket" style={{ color: colorPalette.text }}>Paket</Link>
          <Link href="#portfolio" style={{ color: colorPalette.text }}>Portofolio</Link>
          <Link href="#kontak" style={{ color: colorPalette.text }}>Kontak</Link>
        </Space>
      </header>
      
      <Flex align="center" justify="center" style={{ minHeight: '100vh', textAlign: 'center', padding: '0 20px', position: 'relative' }}>
        <div>
          <Title level={1} className="hero-text" style={{ color: colorPalette.text, margin: 0, fontWeight: 700, fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>Halo, saya <span style={{ color: colorPalette.teal }}>Lionel</span> <span style={{ color: colorPalette.primary }}>Nando</span></Title>
          <div className="hero-text"><Paragraph style={{ marginTop: '8px', marginBottom: '24px', fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>Seorang <TypeAnimation sequence={['Developer Web', 2000, 'Pengembang Kreatif', 2000, 'Spesialis Digital', 2000]} wrapper="span" speed={40} style={{ color: colorPalette.accent, fontWeight: 'bold' }} repeat={Infinity}/></Paragraph></div>
          <Paragraph className="hero-text" style={{ color: colorPalette.text, maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(1rem, 3vw, 1.1rem)' }}>Mengubah ide-ide kompleks menjadi pengalaman web yang intuitif dan indah.</Paragraph>
        </div>
      </Flex>
      
      <div id="tentang" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
          <Title level={2} className="about-element" style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px', background: `linear-gradient(to right, ${colorPalette.teal}, ${colorPalette.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tentang Saya</Title>
          <Row gutter={[48, 24]} align="middle">
              <Col xs={24} md={10} className="about-element" style={{ textAlign: 'center' }}><Avatar size={200} icon={<UserOutlined />} style={{ border: `3px solid ${colorPalette.primary}` }} /></Col>
              <Col xs={24} md={14} className="about-element"><Paragraph style={{ color: colorPalette.text, fontSize: '1.1rem' }}>Halo! Saya Lionel, seorang pengembang web dengan hasrat untuk menciptakan solusi digital yang tidak hanya fungsional, tapi juga memberikan pengalaman yang menyenangkan bagi pengguna. Bagi saya, kode adalah kanvas dan setiap barisnya adalah sapuan kuas untuk melukis karya digital yang bermakna.</Paragraph></Col>
          </Row>
      </div>

      <div id="paket" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Paket Layanan</Title>
        <Row gutter={[32, 32]} justify="center">{packageData.map((pkg, index) => <Col xs={24} md={12} lg={8} key={index} className="package-card"><Card bordered={false} style={{ background: colorPalette.cardBg, backdropFilter: 'blur(10px)', border: `1px solid ${pkg.recommended ? colorPalette.primary : 'rgba(255, 255, 255, 0.1)'}`, height: '100%' }}><Title level={4} style={{ color: colorPalette.primary }}>{pkg.title}</Title><Paragraph style={{ color: colorPalette.text, fontWeight: 'bold' }}>{pkg.price}</Paragraph><List dataSource={pkg.features} renderItem={(item) => <List.Item style={{ color: colorPalette.text, border: 'none', padding: '4px 0' }}>- {item}</List.Item>} style={{ margin: '20px 0' }}/><Button type={pkg.recommended ? 'primary' : 'default'} size="large" block style={pkg.recommended ? { background: colorPalette.primary, borderColor: colorPalette.primary } : {}}>{pkg.buttonText}</Button></Card></Col>)}</Row>
      </div>

      <section id="portfolio-section" style={{ overflow: 'hidden' }}>
        <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, paddingTop: '100px' }}>Karya & Portofolio</Title>
        <div ref={horizontalScrollRef} style={{ width: 'max-content', display: 'flex', padding: '60px 5vw', gap: '40px' }}>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div key={item} className="portfolio-item" style={{ width: 'clamp(300px, 30vw, 400px)' }}>
              <Card bordered={false} style={{ background: colorPalette.cardBg, backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', height: '100%' }}>
                <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}><Skeleton.Image active style={{ width: '100%', height: '200px' }} /></div>
                <div style={{ marginTop: '16px' }}><Title level={5} style={{ color: colorPalette.primary }}>Nama Proyek {item}</Title><Paragraph style={{ color: colorPalette.text }}>Deskripsi singkat.</Paragraph></div>
              </Card>
            </div>
          ))}
        </div>
      </section>
      
      <div id="workflow" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '80px' }}>Proses Kerja Saya</Title>
        <Row gutter={[32, 32]} justify="center">{[{icon: <MessageOutlined />, title: "1. Diskusi & Konsep"},{icon: <BgColorsOutlined />, title: "2. Desain & Prototipe"},{icon: <CodeSandboxOutlined />, title: "3. Pengembangan"},{icon: <RocketOutlined />, title: "4. Peluncuran & Dukungan"}].map(step => (<Col xs={12} md={6} key={step.title} className="workflow-step" style={{ textAlign: 'center' }}><Avatar size={80} icon={step.icon} style={{ background: colorPalette.cardBg, color: colorPalette.teal, border: `2px solid ${colorPalette.teal}`, marginBottom: '16px' }} /><Title level={5} style={{ color: colorPalette.text }}>{step.title}</Title></Col>))}</Row>
      </div>

      <div id="tech-stack" style={{ padding: '100px 20px', maxWidth: '900px', margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Teknologi Andalan Saya</Title>
          <Row gutter={[16, 48]} justify="center" align="middle">{[ {icon: <FaReact size="3em"/>, name: "React"}, {icon: <TbBrandNextjs size="3em"/>, name: "Next.js"}, {icon: <FaNodeJs size="3em"/>, name: "Node.js"}, {icon: <TbBrandVercel size="3em"/>, name: "Vercel"}, {icon: <FaFigma size="3em"/>, name: "Figma"} ].map(tech => (<Col xs={8} sm={6} md={4} key={tech.name} className="tech-icon" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}><span style={{ color: colorPalette.teal }}>{tech.icon}</span><span style={{ color: colorPalette.text }}>{tech.name}</span></Col>))}</Row>
      </div>

      <div id="faq" style={{ padding: '100px 20px', maxWidth: '900px', margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Tanya Jawab (FAQ)</Title>
          <Collapse accordion ghost expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} expandIconPosition="end" className="faq-item">
              <Collapse.Panel header="Berapa lama proses pembuatan website?" key="1"><Paragraph>Tergantung kompleksitas. Untuk landing page biasanya sekitar 2 minggu. Untuk situs yang lebih besar bisa memakan waktu 4-6 minggu.</Paragraph></Collapse.Panel>
              <Collapse.Panel header="Apakah harga sudah termasuk domain dan hosting?" key="2"><Paragraph>Harga paket belum termasuk. Namun, saya bisa membantu proses pembelian dan setup-nya sesuai provider pilihan Anda.</Paragraph></Collapse.Panel>
              <Collapse.Panel header="Bagaimana alur pembayarannya?" key="3"><Paragraph>Umumnya sistem 50% uang muka sebelum proyek dimulai, dan 50% pelunasan setelah website selesai dan siap untuk dipublikasikan.</Paragraph></Collapse.Panel>
          </Collapse>
      </div>

      <footer id="kontak" style={{ backgroundColor: '#111', color: '#aaa', padding: '80px 20px 20px 20px', borderTop: '1px solid #333' }}>
        <div id="kontak-cta" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="contact-element" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <Title level={2} style={{ color: colorPalette.text }}>Punya Proyek? Mari Kita Mulai.</Title>
                <Paragraph style={{ color: '#aaa' }}>Saya selalu antusias untuk mendengar ide-ide baru. Hubungi saya dan mari kita diskusikan.</Paragraph>
                <Button type="primary" size="large" href="mailto:emailanda@example.com" style={{ background: colorPalette.primary, borderColor: colorPalette.primary }}>Hubungi Saya Sekarang</Button>
            </div>
            <Row gutter={[48, 48]}><Col xs={24} md={8}><Title level={4} style={{ color: colorPalette.text }}>Lionel Nando</Title><Paragraph>Seorang web developer yang berfokus pada solusi kreatif dan pengalaman pengguna yang modern.</Paragraph></Col><Col xs={12} md={5}><Title level={5} style={{ color: '#ddd' }}>Navigasi</Title><Space direction="vertical"><Link href="#tentang">Tentang</Link><Link href="#paket">Paket</Link><Link href="#portfolio">Portofolio</Link></Space></Col><Col xs={12} md={5}><Title level={5} style={{ color: '#ddd' }}>Kontak</Title><Space direction="vertical"><Link href="mailto:emailanda@example.com">Email</Link><Link href="tel:+6281234567890">Telepon</Link></Space></Col><Col xs={24} md={6}><Title level={5} style={{ color: '#ddd' }}>Temukan Saya di</Title><Space size="large"><Link href="https://linkedin.com/in/usernameanda" target="_blank" style={{ fontSize: '1.5rem' }}><LinkedinOutlined /></Link><Link href="https://github.com/usernameanda" target="_blank" style={{ fontSize: '1.5rem' }}><GithubOutlined /></Link></Space></Col></Row>
            <div style={{ textAlign: 'center', marginTop: '80px', paddingTop: '20px', borderTop: '1px solid #333' }}>
                <Paragraph style={{ margin: 0, fontSize: '0.9rem' }}>© {new Date().getFullYear()} Lionel Nando. All Rights Reserved.</Paragraph>
            </div>
        </div>
      </footer>
      
      {/* PERBAIKAN BUG: Tag style di bawah ini sekarang menggunakan sintaks yang benar. */}
      <style jsx global>{`
        .ant-collapse, .ant-collapse-content, .ant-collapse-header-text { color: #aaa !important; }
        .ant-collapse-content-box { background: #1f1f1f !important; }
        .ant-collapse-item { background: #2a2a2a !important; border-bottom: 1px solid #333 !important; }
        .ant-collapse-expand-icon { color: ${colorPalette.primary} !important; }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
        }
      `}</style>
    </main>
  );
};

export default LandingPage;