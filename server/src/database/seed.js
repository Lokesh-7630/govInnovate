const { pool } = require('../config/database');
const { hashPassword } = require('../utils/password');


const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...\n');


  try {
    // 1. Create Admin User
    console.log('👤 Creating admin user...');
    const adminPassword = await hashPassword('admin123');
    const admin = await pool.query(`
      INSERT INTO users (name, email, password_hash, role, organization, phone, is_verified)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, ['Admin User', 'admin@govinnovate.gov', adminPassword, 'admin', 'Government of India', '1111111111', true]);
    console.log('✅ Admin created:', admin.rows[0].email);


    // 2. Create Expert Users
    console.log('\n👥 Creating expert users...');
    const experts = [
      ['Dr. Rajesh Kumar', 'rajesh@govinnovate.gov', 'expert', 'IIT Delhi', '2222222222'],
      ['Prof. Priya Sharma', 'priya@govinnovate.gov', 'expert', 'IISc Bangalore', '3333333333'],
      ['Dr. Amit Patel', 'amit@govinnovate.gov', 'expert', 'NITI Aayog', '4444444444'],
      ['Dr. Sunita Reddy', 'sunita@govinnovate.gov', 'expert', 'Hyderabad University', '5555555555']
    ];


    for (const [name, email, role, org, phone] of experts) {
      const password = await hashPassword('expert123');
      const expert = await pool.query(`
        INSERT INTO users (name, email, password_hash, role, organization, phone, is_verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, [name, email, password, role, org, phone, true]);
      console.log(`✅ Expert created: ${name}`);
    }


    // 3. Create Startup Users with DPIIT numbers
    console.log('\n🚀 Creating startup users...');
    const startups = [
      ['TechVision Solutions', 'techvision@startup.com', 'AI/ML', 'Smart Cities', 'Early Stage', 'AI-powered traffic management', 8, 75000, 'https://techvision.com', 'https://techvision.com/pitch.pdf', 'DIPP12345'],
      ['GreenEnergy Innovations', 'greenenergy@startup.com', 'CleanTech', 'Renewable Energy', 'Growth Stage', 'Solar panel optimization using IoT', 15, 250000, 'https://greenenergy.com', 'https://greenenergy.com/pitch.pdf', 'DIPP23456'],
      ['HealthTech Plus', 'healthtech@startup.com', 'Healthcare', 'Digital Health', 'Early Stage', 'Telemedicine platform for rural areas', 6, 50000, 'https://healthtechplus.com', 'https://healthtechplus.com/pitch.pdf', 'DIPP34567'],
      ['AgriSmart Technologies', 'agrismart@startup.com', 'AgriTech', 'Agriculture', 'Early Stage', 'IoT-based crop monitoring system', 5, 30000, 'https://agrismart.com', 'https://agrismart.com/pitch.pdf', 'DIPP45678'],
      ['EduRevolution', 'edurevolution@startup.com', 'EdTech', 'Education', 'Growth Stage', 'AI-powered personalized learning', 12, 180000, 'https://edurevolution.com', 'https://edurevolution.com/pitch.pdf', 'DIPP56789'],
      ['FinSecure', 'finsecure@startup.com', 'FinTech', 'Financial Services', 'Early Stage', 'Blockchain-based payment gateway', 7, 60000, 'https://finsecure.com', 'https://finsecure.com/pitch.pdf', 'DIPP67890'],
      ['WasteManage Pro', 'wastemanage@startup.com', 'CleanTech', 'Waste Management', 'Early Stage', 'Smart waste segregation system', 4, 25000, 'https://wastemanagepro.com', 'https://wastemanagepro.com/pitch.pdf', 'DIPP78901'],
      ['WaterPure Solutions', 'waterpure@startup.com', 'CleanTech', 'Water Management', 'Growth Stage', 'IoT water quality monitoring', 10, 120000, 'https://waterpure.com', 'https://waterpure.com/pitch.pdf', 'DIPP89012'],
      ['CyberShield', 'cybershield@startup.com', 'Cybersecurity', 'Security', 'Early Stage', 'AI-based threat detection', 6, 45000, 'https://cybershield.com', 'https://cybershield.com/pitch.pdf', 'DIPP90123'],
      ['LogiChain', 'logichain@startup.com', 'Logistics', 'Supply Chain', 'Growth Stage', 'Blockchain supply chain tracking', 14, 200000, 'https://logichain.com', 'https://logichain.com/pitch.pdf', 'DIPP01234'],
      ['RetailBot', 'retailbot@startup.com', 'Retail', 'E-commerce', 'Early Stage', 'AI chatbot for customer service', 5, 35000, 'https://retailbot.com', 'https://retailbot.com/pitch.pdf', 'DIPP11223'],
      ['ConstructTech', 'constructtech@startup.com', 'Construction', 'Infrastructure', 'Early Stage', 'AR-based construction planning', 8, 70000, 'https://constructtech.com', 'https://constructtech.com/pitch.pdf', 'DIPP22334'],
      ['FoodSafety AI', 'foodsafety@startup.com', 'FoodTech', 'Food Safety', 'Early Stage', 'AI food quality inspection', 6, 40000, 'https://foodsafetyai.com', 'https://foodsafetyai.com/pitch.pdf', 'DIPP33445'],
      ['TravelMate', 'travelmate@startup.com', 'Travel', 'Tourism', 'Growth Stage', 'AR-based tourist guide app', 9, 90000, 'https://travelmate.com', 'https://travelmate.com/pitch.pdf', 'DIPP44556'],
      ['LegalEase', 'legalease@startup.com', 'LegalTech', 'Legal Services', 'Early Stage', 'AI contract analysis platform', 7, 55000, 'https://legalease.com', 'https://legalease.com/pitch.pdf', 'DIPP55667'],
      ['HRBotics', 'hrbotics@startup.com', 'HRTech', 'Human Resources', 'Early Stage', 'AI recruitment automation', 5, 38000, 'https://hrbotics.com', 'https://hrbotics.com/pitch.pdf', 'DIPP66778'],
      ['InsureTech Pro', 'insuretech@startup.com', 'InsurTech', 'Insurance', 'Growth Stage', 'Digital insurance platform', 11, 150000, 'https://insuretechpro.com', 'https://insuretechpro.com/pitch.pdf', 'DIPP77889'],
      ['PropTech Solutions', 'proptech@startup.com', 'PropTech', 'Real Estate', 'Early Stage', 'Virtual property tours using VR', 6, 48000, 'https://proptechsolutions.com', 'https://proptechsolutions.com/pitch.pdf', 'DIPP88990']
    ];


    let startupIds = [];
    for (const [startup_name, email, sector, stage, description, team_size, funding, website, pitch_deck_url, dpiit_number] of startups) {
      const password = await hashPassword('startup123');
      
      // Create user
      const user = await pool.query(`
        INSERT INTO users (name, email, password_hash, role, organization, phone, is_verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `, [startup_name.split(' ')[0], email, password, 'startup', startup_name, '9999999999', true]);
      
      // Create startup with DPIIT number
      const startup = await pool.query(`
        INSERT INTO startups (
          user_id, startup_name, founder_name, email, phone,
          sector, stage, description, team_size, funding_raised, website, pitch_deck_url, dpiit_number
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id
      `, [
        user.rows[0].id,
        startup_name,
        startup_name.split(' ')[0],
        email,
        '9999999999',
        sector,
        stage,
        description,
        team_size,
        funding,
        website,
        pitch_deck_url,
        dpiit_number
      ]);
      
      startupIds.push(startup.rows[0].id);
      console.log(`✅ Startup created: ${startup_name} (DPIIT: ${dpiit_number})`);
    }


    // 4. Create Challenges
    console.log('\n📋 Creating challenges...');
    const challenges = [
      [
        'Smart Traffic Management System',
        'Develop an AI-based traffic optimization system for urban areas to reduce congestion and improve traffic flow',
        'Smart Cities',
        'Transport Department',
        500000,
        2000000,
        18,
        'open',
        '2026-12-31'
      ],
      [
        'Digital Health Records Platform',
        'Create a secure, blockchain-based digital health records system for rural healthcare centers',
        'Healthcare',
        'Health Ministry',
        300000,
        1500000,
        12,
        'open',
        '2026-11-30'
      ],
      [
        'AI-Powered Crop Disease Detection',
        'Build a mobile app that uses computer vision to detect crop diseases from leaf images',
        'Agriculture',
        'Agriculture Ministry',
        200000,
        1000000,
        9,
        'open',
        '2026-10-31'
      ]
    ];


    let challengeIds = [];
    for (const [title, description, sector, department, budget_min, budget_max, timeline, status, deadline] of challenges) {
      const challenge = await pool.query(`
        INSERT INTO challenges (
          title, description, sector, department,
          budget_min, budget_max, timeline_months, status, application_deadline
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
      `, [title, description, sector, department, budget_min, budget_max, timeline, status, deadline]);
      
      challengeIds.push(challenge.rows[0].id);
      console.log(`✅ Challenge created: ${title}`);
    }


    // 5. Create Applications (some startups apply to challenges)
    console.log('\n📝 Creating applications...');
    const applications = [
      [1, 1, 'pending'],
      [2, 2, 'pending'],
      [3, 2, 'pending'],
      [4, 3, 'pending'],
      [5, 1, 'pending'],
      [6, 3, 'pending'],
      [7, 1, 'pending'],
      [8, 2, 'pending']
    ];


    for (const [startup_id, challenge_id, status] of applications) {
      await pool.query(`
        INSERT INTO applications (startup_id, challenge_id, status)
        VALUES ($1, $2, $3)
      `, [startup_id, challenge_id, status]);
    }
    console.log(`✅ Created ${applications.length} applications`);


    // 6. Create Evaluations
    console.log('\n⭐ Creating evaluations...');
    const evaluations = [
      [1, 'Dr. Rajesh Kumar', 'Technical Expert', 9, 8, 9, 7, 'Excellent innovation with strong technical foundation', 'approve'],
      [2, 'Prof. Priya Sharma', 'Domain Expert', 8, 9, 8, 8, 'Great market potential, needs more R&D', 'approve'],
      [3, 'Dr. Amit Patel', 'Industry Expert', 7, 8, 7, 6, 'Good concept, requires pilot testing', 'review']
    ];


    for (const [application_id, evaluator, role, innovation, market, team, financial, feedback, recommendation] of evaluations) {
      await pool.query(`
        INSERT INTO evaluations (
          application_id, evaluator_name, evaluator_role,
          innovation_score, market_score, team_score, financial_score,
          total_score, feedback, recommendation
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        application_id, evaluator, role,
        innovation, market, team, financial,
        innovation + market + team + financial, feedback, recommendation
      ]);
    }
    console.log(`✅ Created ${evaluations.length} evaluations`);


    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - 1 Admin user');
    console.log('   - 4 Expert users');
    console.log('   - 18 Startup users');
    console.log('   - 18 Startups (all with DPIIT numbers)');
    console.log('   - 3 Challenges');
    console.log('   - 8 Applications');
    console.log('   - 3 Evaluations');
    console.log('\n🔐 Login Credentials:');
    console.log('   Admin: admin@govinnovate.gov / admin123');
    console.log('   Expert: rajesh@govinnovate.gov / expert123');
    console.log('   Startup: techvision@startup.com / startup123');


  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
};


// Run seeder
if (require.main === module) {
  seedDatabase();
}


module.exports = seedDatabase;