'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Flex, Typography, Row, Col, Card, Button, List, Skeleton, Space } from 'antd';
import { MailOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import { TypeAnimation } from 'react-type-animation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { Title, Paragraph, Link } = Typography;

const colorPalette = {
  primary: '#f7b722',
  accent: '#e31f26',
  teal: '#45bfb4',
  text: '#E0E0E0',
  cardBg: 'rgba(40, 40, 40, 0.5)',
  headerBg: 'rgba(26, 26, 26, 0.8)', // Warna untuk header
};

// Data paket (tidak berubah)
const packageData = [
  { title: 'Paket Starter', price: 'Mulai dari Rp X.XXX.XXX', features: ['Desain Landing Page Modern', 'Responsif di semua perangkat', 'Dikerjakan oleh 1 Developer', 'Konsultasi Desain (1 Sesi)', 'Waktu Pengerjaan: 2 Minggu'], buttonText: 'Pilih Paket', recommended: false },
  { title: 'Paket Bisnis', price: 'Mulai dari Rp XX.XXX.XXX', features: ['Situs Web hingga 5 Halaman', 'Integrasi Sistem Manajemen Konten (CMS)', 'Dikerjakan oleh 2 Developer', 'Optimisasi SEO Dasar', 'Waktu Pengerjaan: 4 Minggu'], buttonText: 'Paling Populer', recommended: true },
  { title: 'Paket Enterprise', price: 'Hubungi untuk Penawaran', features: ['Solusi Web Kompleks / Aplikasi Web', 'Fitur Kustom & Integrasi API', 'Tim Developer Khusus', 'Dukungan Prioritas & Maintenance', 'Waktu Pengerjaan: Sesuai Proyek'], buttonText: 'Konsultasi Sekarang', recommended: false },
];

const LandingPage = () => {
  const mainRef = useRef(null);
  const [isHeaderVisible, setHeaderVisible] = useState(false);

  // LOGIKA UNTUK HEADER CERDAS (AUTO-HIDING)
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Jika posisi vertikal mouse kurang dari 80px dari atas, tampilkan header
      if (e.clientY < 80) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Cleanup listener saat komponen tidak lagi digunakan
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // LOGIKA UNTUK SEMUA ANIMASI GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ANIMASI HERO SECTION YANG LEBIH "BERANI"
      gsap.from(".hero-text", {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Fungsi animasi scroll yang sudah ada
      const createScrollAnimation = (triggerSelector, targets, vars) => {
        gsap.fromTo(targets,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: {
              trigger: triggerSelector,
              start: 'top 85%', end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            }, ...vars,
          }
        );
      };

      createScrollAnimation("#paket", ".package-card");
      createScrollAnimation("#portfolio", ".portfolio-card");
      createScrollAnimation("#kontak", ".contact-element", { stagger: 0.1 });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      {/* ELEMEN HEADER BARU */}
      <header
        style={{
          position: 'fixed',
          top: isHeaderVisible ? '0' : '-100px', // Muncul atau sembunyi
          left: 0,
          width: '100%',
          padding: '15px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100,
          background: colorPalette.headerBg,
          backdropFilter: 'blur(10px)',
          transition: 'top 0.4s ease-in-out',
        }}
      >
        <div style={{ opacity: 0.7 }}>
            <Image src="/logo-ln.png" alt="Logo L&N" width={40} height={40} />
        </div>
        <Space size="large">
            <Link href="#paket" style={{ color: colorPalette.text }}>Paket</Link>
            <Link href="#portfolio" style={{ color: colorPalette.text }}>Portofolio</Link>
            <Link href="#kontak" style={{ color: colorPalette.text }}>Kontak</Link>
        </Space>
      </header>

      {/* SECTION 1: HERO */}
      <Flex align="center" justify="center" style={{ minHeight: '100vh', textAlign: 'center', padding: '0 20px', position: 'relative' }}>
        <div>
          {/* Tambahkan class "hero-text" untuk target animasi GSAP */}
          <Title level={1} className="hero-text" style={{ color: colorPalette.text, margin: 0, fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Halo, saya{' '}
            <span style={{ color: colorPalette.teal }}>Lionel</span>{' '}
            <span style={{ color: colorPalette.primary }}>Nando</span>
          </Title>
          <div className="hero-text">
            <Paragraph style={{ marginTop: '8px', marginBottom: '24px', fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}>
              Seorang <TypeAnimation sequence={['Developer Web', 2000, 'Pengembang Kreatif', 2000, 'Spesialis Digital', 2000]} wrapper="span" speed={40} style={{ color: colorPalette.accent, fontWeight: 'bold' }} repeat={Infinity}/>
            </Paragraph>
          </div>
          <Paragraph className="hero-text" style={{ color: colorPalette.text, maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>
            Mengubah ide-ide kompleks menjadi pengalaman web yang intuitif dan indah.
          </Paragraph>
        </div>
        <div style={{ position: 'absolute', left: 24, bottom: 24, opacity: 0.7 }}>
            <Image src="/Login.png" alt="Logo L&N" width={50} height={50} />
        </div>
      </Flex>
      
      {/* SECTION LAINNYA (TIDAK ADA PERUBAHAN STRUKTUR) */}
      <div id="paket" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Paket Layanan Pengembangan Web</Title>
        <Row gutter={[32, 32]} justify="center">
          {packageData.map((pkg, index) => (
            <Col xs={24} sm={12} md={8} key={index} className="package-card">
              <Card bordered={false} style={{ background: colorPalette.cardBg, backdropFilter: 'blur(10px)', border: `1px solid ${pkg.recommended ? colorPalette.primary : 'rgba(255, 255, 255, 0.1)'}`, height: '100%' }}>
                <Title level={4} style={{ color: colorPalette.primary }}>{pkg.title}</Title>
                <Paragraph style={{ color: colorPalette.text, fontWeight: 'bold' }}>{pkg.price}</Paragraph>
                <List dataSource={pkg.features} renderItem={(item) => <List.Item style={{ color: colorPalette.text, border: 'none', padding: '4px 0' }}>- {item}</List.Item>} style={{ margin: '20px 0' }}/>
                <Button type={pkg.recommended ? 'primary' : 'default'} size="large" block style={pkg.recommended ? { background: colorPalette.primary, borderColor: colorPalette.primary } : {}}>{pkg.buttonText}</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div id="portfolio" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Karya & Portofolio</Title>
        <Row gutter={[32, 32]} justify="center">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Col xs={24} sm={12} md={8} key={item} className="portfolio-card">
              <Card bordered={false} style={{ background: colorPalette.cardBg, backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
                <div style={{ marginTop: '16px' }}>
                  <Title level={5} style={{ color: colorPalette.primary }}>Nama Proyek {item}</Title>
                  <Paragraph style={{ color: colorPalette.text }}>Deskripsi singkat tentang proyek ini.</Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <footer id="kontak" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <Title level={2} style={{ color: colorPalette.text }} className="contact-element">Mari Bekerja Sama</Title>
        <Paragraph style={{ color: colorPalette.text, maxWidth: '600px', margin: '20px auto 40px auto' }} className="contact-element">
          Punya ide atau proyek yang ingin diwujudkan? Saya siap membantu Anda mengubahnya menjadi kenyataan digital. Hubungi saya melalui salah satu platform di bawah ini.
        </Paragraph>
        <div className="contact-element">
          <Button type="primary" size="large" icon={<MailOutlined />} href="mailto:emailanda@example.com" style={{ background: colorPalette.primary, borderColor: colorPalette.primary, marginRight: '16px' }}>Email Saya</Button>
          <Button size="large" icon={<LinkedinOutlined />} href="https://linkedin.com/in/usernameanda" target="_blank" style={{ marginRight: '16px' }}>LinkedIn</Button>
          <Button size="large" icon={<GithubOutlined />} href="https://github.com/usernameanda" target="_blank">GitHub</Button>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;