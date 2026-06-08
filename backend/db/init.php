<?php
require_once __DIR__ . '/../config/db.php';

$dbPath = __DIR__ . '/../db/crm.sqlite';

if (!file_exists($dbPath)) {
    $pdo = getDB();

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS leads (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT    NOT NULL,
            email      TEXT    NOT NULL,
            phone      TEXT    NOT NULL,
            status     TEXT    NOT NULL DEFAULT 'New'
                       CHECK(status IN ('New','Contacted','Qualified','Lost')),
            source     TEXT    NOT NULL DEFAULT 'Website',
            notes      TEXT             DEFAULT '',
            created_at DATETIME         DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME         DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // 50 seed leads — mix of statuses
    $leads = [
        ['Rahul Sharma',     'rahul.sharma@gmail.com',     '9876543210', 'New',       'Website',  '',                                              '2024-05-20 10:30:00'],
        ['Priya Patel',      'priya.patel@email.com',      '9876543211', 'Contacted', 'Referral', 'Interested in premium package',                  '2024-05-20 11:00:00'],
        ['Amit Kumar',       'amit.kumar@email.com',       '9876543212', 'Qualified', 'Website',  'Ready to sign contract',                         '2024-05-19 09:15:00'],
        ['Sneha Iyer',       'sneha.iyer@email.com',       '9876543213', 'New',       'Instagram','Enquired about bridal package',                  '2024-05-19 14:00:00'],
        ['Vikram Singh',     'vikram.singh@email.com',     '9876543214', 'Lost',      'Website',  'Budget too high',                                '2024-05-18 10:00:00'],
        ['Anjali Mehta',     'anjali.mehta@email.com',     '9876543215', 'Contacted', 'Referral', 'Follow-up scheduled for next week',              '2024-05-18 11:30:00'],
        ['Karan Malhotra',   'karan.malhotra@email.com',   '9876543216', 'Qualified', 'Walk-in',  'Wants monthly membership',                       '2024-05-17 09:00:00'],
        ['Neha Verma',       'neha.verma@email.com',       '9876543217', 'New',       'Website',  '',                                              '2024-05-17 10:00:00'],
        ['Suresh Gupta',     'suresh.gupta@email.com',     '9876543218', 'Lost',      'Instagram','Went with competitor',                           '2024-05-16 15:00:00'],
        ['Divya Nair',       'divya.nair@email.com',       '9876543219', 'Contacted', 'Website',  'Demo scheduled',                                 '2024-05-16 12:00:00'],
        ['Rohit Joshi',      'rohit.joshi@email.com',      '9876543220', 'New',       'Referral', '',                                              '2024-05-15 09:30:00'],
        ['Kavita Rao',       'kavita.rao@email.com',       '9876543221', 'Qualified', 'Website',  'Approved budget, needs final approval',           '2024-05-15 11:00:00'],
        ['Arun Bhat',        'arun.bhat@email.com',        '9876543222', 'Contacted', 'Walk-in',  'Very interested in hair care services',           '2024-05-14 14:00:00'],
        ['Pooja Sharma',     'pooja.sharma@email.com',     '9876543223', 'New',       'Instagram','',                                              '2024-05-14 09:00:00'],
        ['Manish Tiwari',    'manish.tiwari@email.com',    '9876543224', 'Lost',      'Website',  'Moved to another city',                          '2024-05-13 16:00:00'],
        ['Rekha Pillai',     'rekha.pillai@email.com',     '9876543225', 'Qualified', 'Referral', 'High-value client, close this week',             '2024-05-13 10:00:00'],
        ['Sanjay Dubey',     'sanjay.dubey@email.com',     '9876543226', 'New',       'Website',  '',                                              '2024-05-12 09:00:00'],
        ['Meera Krishnan',   'meera.krishnan@email.com',   '9876543227', 'Contacted', 'Instagram','Interested in skincare packages',                '2024-05-12 11:00:00'],
        ['Deepak Arora',     'deepak.arora@email.com',     '9876543228', 'New',       'Website',  '',                                              '2024-05-11 10:00:00'],
        ['Sunita Kapoor',    'sunita.kapoor@email.com',    '9876543229', 'Qualified', 'Walk-in',  'VIP client potential',                           '2024-05-11 14:00:00'],
        ['Ramesh Yadav',     'ramesh.yadav@email.com',     '9876543230', 'Contacted', 'Referral', 'Called back, positive response',                 '2024-05-10 09:00:00'],
        ['Anita Desai',      'anita.desai@email.com',      '9876543231', 'New',       'Website',  '',                                              '2024-05-10 11:00:00'],
        ['Vijay Khanna',     'vijay.khanna@email.com',     '9876543232', 'Lost',      'Instagram','No longer interested',                           '2024-05-09 15:00:00'],
        ['Smita Naik',       'smita.naik@email.com',       '9876543233', 'Contacted', 'Website',  'Wants group discount',                           '2024-05-09 10:00:00'],
        ['Prakash Menon',    'prakash.menon@email.com',    '9876543234', 'New',       'Referral', '',                                              '2024-05-08 09:00:00'],
        ['Lalita Bose',      'lalita.bose@email.com',      '9876543235', 'Qualified', 'Walk-in',  'Wants quarterly plan',                           '2024-05-08 11:00:00'],
        ['Harish Choudhary', 'harish.choudhary@email.com', '9876543236', 'New',       'Website',  '',                                              '2024-05-07 10:00:00'],
        ['Usha Varma',       'usha.varma@email.com',       '9876543237', 'Contacted', 'Instagram','Needs more info on pricing',                     '2024-05-07 12:00:00'],
        ['Naveen Reddy',     'naveen.reddy@email.com',     '9876543238', 'Lost',      'Website',  'Chose competitor after trial',                   '2024-05-06 15:00:00'],
        ['Geeta Shetty',     'geeta.shetty@email.com',     '9876543239', 'New',       'Referral', '',                                              '2024-05-06 09:00:00'],
        ['Tarun Saxena',     'tarun.saxena@email.com',     '9876543240', 'Qualified', 'Website',  'Negotiating final price',                        '2024-05-05 10:00:00'],
        ['Vandana Jain',     'vandana.jain@email.com',     '9876543241', 'Contacted', 'Walk-in',  'Wants weekend appointments only',                '2024-05-05 11:00:00'],
        ['Manoj Shukla',     'manoj.shukla@email.com',     '9876543242', 'New',       'Instagram','',                                              '2024-05-04 09:00:00'],
        ['Asha Bhatt',       'asha.bhatt@email.com',       '9876543243', 'Contacted', 'Referral', 'Family referral, warm lead',                     '2024-05-04 13:00:00'],
        ['Rajesh Pandey',    'rajesh.pandey@email.com',    '9876543244', 'Lost',      'Website',  'Price sensitivity, lost to competitor',           '2024-05-03 16:00:00'],
        ['Sangeeta Mishra',  'sangeeta.mishra@email.com',  '9876543245', 'New',       'Website',  '',                                              '2024-05-03 09:00:00'],
        ['Dinesh Kulkarni',  'dinesh.kulkarni@email.com',  '9876543246', 'Qualified', 'Walk-in',  'Looking for corporate package',                  '2024-05-02 10:00:00'],
        ['Preeti Shah',      'preeti.shah@email.com',      '9876543247', 'Contacted', 'Instagram','Active on social media, good prospect',          '2024-05-02 11:00:00'],
        ['Vivek Chopra',     'vivek.chopra@email.com',     '9876543248', 'New',       'Referral', '',                                              '2024-05-01 09:00:00'],
        ['Kamala Nair',      'kamala.nair@email.com',      '9876543249', 'Qualified', 'Website',  'Ready to close, waiting for MD approval',        '2024-05-01 14:00:00'],
        ['Ashok Trivedi',    'ashok.trivedi@email.com',    '9876543250', 'New',       'Website',  '',                                              '2024-04-30 09:00:00'],
        ['Sarita Bansal',    'sarita.bansal@email.com',    '9876543251', 'Contacted', 'Walk-in',  'Loves the ambiance, likely to convert',          '2024-04-30 11:00:00'],
        ['Pramod Chauhan',   'pramod.chauhan@email.com',   '9876543252', 'Lost',      'Instagram','Ghosted after initial contact',                  '2024-04-29 15:00:00'],
        ['Radha Iyer',       'radha.iyer@email.com',       '9876543253', 'New',       'Referral', '',                                              '2024-04-29 09:00:00'],
        ['Nikhil Garg',      'nikhil.garg@email.com',      '9876543254', 'Contacted', 'Website',  'Needs demo of services',                         '2024-04-28 10:00:00'],
        ['Shweta Agarwal',   'shweta.agarwal@email.com',   '9876543255', 'Qualified', 'Walk-in',  'Referred 3 friends already',                     '2024-04-28 11:00:00'],
        ['Mukesh Rawat',     'mukesh.rawat@email.com',     '9876543256', 'New',       'Website',  '',                                              '2024-04-27 09:00:00'],
        ['Jaya Pillai',      'jaya.pillai@email.com',      '9876543257', 'Contacted', 'Instagram','Wants custom bridal package',                    '2024-04-27 13:00:00'],
        ['Sunil Mathur',     'sunil.mathur@email.com',     '9876543258', 'New',       'Referral', '',                                              '2024-04-26 09:00:00'],
        ['Poonam Srivastava','poonam.srivastava@email.com','9876543259', 'Qualified', 'Website',  'Interested in annual subscription plan',         '2024-04-26 14:00:00'],
    ];

    $stmt = $pdo->prepare(
        "INSERT INTO leads (name, email, phone, status, source, notes, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    foreach ($leads as $lead) {
        $stmt->execute($lead);
    }
}
