DO $$
DECLARE c_id uuid;
BEGIN
INSERT INTO competence (code, name, description)
VALUES ('A.1', 'IS and Business Strategy Alignment', 'Anticipates long term business requirements, influences improvement of the organisation’s process efficiency and effectiveness. Determines the IS model and enterprise architecture maintaining consistency with organisational policy and ensuring a secure environment. Recognises potential risks and business requirements to assure resilience in the alignment of systems and services to the business strategy. Makes strategic IS policy decisions for the enterprise, including sourcing strategies.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides leadership for the construction and implementation of long term innovative IS solutions.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides IS strategic leadership to reach consensus and commitment from the management team of the enterprise.');


INSERT INTO competence (code, name, description)
VALUES ('A.2', 'Service Level Management', 'Defines, validates and makes applicable service level agreements (SLAs) and underpinning contracts tailored to services offered. Negotiates service performance levels taking into account the needs and capacity of stakeholders and business.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Ensures the content of the SLA.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Negotiates revision of SLAs, in accordance with the overall objectives. Ensures the achievement of planned results');


INSERT INTO competence (code, name, description)
VALUES ('A.3', 'Business Plan Development', 'Addresses the design and structure of a business or product plan including the identification of alternative approaches as well as return on investment propositions. Considers the possible and applicable sourcing models. Presents cost benefit analysis and reasoned arguments in support of the selected strategy. Ensures compliance with business risk and technology strategies. Communicates and sells business plan to relevant stakeholders and addresses political, financial, and organisational interests.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits specialist knowledge to provide analysis of market environment etc.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides leadership for the creation of an information system strategy that meets the requirements of the business (e.g. distributed, mobility-based) and includes risks and opportunities.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Applies strategic thinking and organisational leadership to exploit the capability of Information Technology to improve or transform the business.');


INSERT INTO competence (code, name, description)
VALUES ('A.4', 'Product / Service Planning', 'Analyses and defines current and target status. Estimates cost effectiveness, points of risk, opportunities, strengths and weaknesses, with a critical approach. Creates structured plans; establishes time scales and milestones, ensuring optimisation of activities and resources. Manages services portfolio and change requests. Defines delivery quantity and provides an overview of additional documentation requirements. Specifies correct handling of products in accordance with current legislation.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Systematically documents standard and simple elements of a product.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits specialist knowledge to create and maintain complex documents.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides leadership and takes responsibility for, developing and maintaining overall plans.');


INSERT INTO competence (code, name, description)
VALUES ('A.5', 'Architecture Design', 'Specifies, refines, updates and makes available a formal approach to implement solutions and services, necessary to develop and operate the IS architecture, taking into account the requirements from business, management and data and information infrastructure. Identifies change requirements and the components involved: hardware, software, applications, processes, services, information and technology platform. Takes into account interoperability, reversibility, scalability, usability, accessibility and security, including the need to account for the development and management of vulnerability within existing and emerging technologies. Maintains alignment between business evolution and technology developments and services to ensure capacity of IT solutions according to SLA.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits specialist knowledge to define relevant ICT technology and specifications to be deployed in the construction of multiple ICT projects, applications or infrastructure improvements.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Acts with wide ranging accountability to define the strategy to implement ICT technology compliant with business need. Takes account of the current technology platform, obsolescent equipment and latest technological innovations.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides strategic leadership for implementing the digital enterprise strategy. Applies strategic thinking to discover and recognize new patterns in data sets and new ICT systems, to achieve business benefits.');


INSERT INTO competence (code, name, description)
VALUES ('A.6', 'Application Design', 'Analyses, specifies, updates and makes available a model to implement applications in accordance with IS policy and user/customer needs. Selects appropriate technical options for application design, optimising the balance between cost and quality. Designs data structures and builds system structure models according to analysis results through modelling languages. Ensures that all aspects take account of interoperability, usability, accessibility and security. Identifies a common reference framework to validate the models with representative users, based upon development models (e.g. iterative approach).')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Contributes to the design and general functional specification and interfaces');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Organises the overall planning of the design of the application.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Accounts for own and others actions in ensuring that the application is correctly integrated within a complex environment and complies with user / customer needs.');


INSERT INTO competence (code, name, description)
VALUES ('A.7', 'Technology Trend Monitoring', 'Investigates latest ICT technological developments to establish understanding of evolving technologies. Encourages and explores internal and external sources (including e.g. research activities, patents, start-up activities, digital communities) for innovative ideas and opportunities. Devises innovative solutions for the adoption or integration of existing or new technology and/or ideas into existing products, applications or services or for the creation of new ones.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Detects signs of change to provide supervision and analysis of current and trend-setting ICT technological developments. Establishes relationships with relevant communities');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Validates new and emerging technologies, coupled with expert understanding of the business, to envision and articulate solutions for the future. Creates the organisation wide trend monitoring processes.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Plans and leads an organisational structure and support system for systematic technology watch. Advises and influences strategic decisions envisioning and articulating future ICT solutions.');


INSERT INTO competence (code, name, description)
VALUES ('A.8', 'Sustainability Management', 'Estimates the impact of ICT solutions in terms of eco responsibilities, including energy consumption, waste treatment and environmental policy. Analyses the prospects and impacts in social and financial sustainability of ICT projects, developments, services and operations. Advises business and ICT stakeholders on sustainable options that are consistent with the business strategy. Applies an ICT purchasing and sales policy which fulfills eco-responsibilities.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Promotes awareness, training and commitment for the deployment of sustainable development and applies the necessary tools for piloting this approach.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Defines the strategy of sustainable IS development and digital services. Provides input into the business strategy to ensure that sustainability is considered and incorporated.');


INSERT INTO competence (code, name, description)
VALUES ('A.9', 'Innovating', 'Devises creative solutions for the provision of new concepts, ideas, products or services. Deploys novel and open thinking to envision exploitation of technological advances to address business / society needs or research direction.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Applies independent thinking and technology awareness to lead the integration of disparate concepts for the provision of unique solutions.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides strategic leadership for the introduction of new concepts. Guides innovation approaches and leads the cultural change to innovation.');


INSERT INTO competence (code, name, description)
VALUES ('A.10', 'User Experience', 'Appreciates and applies the foundational principles of human-computer-interaction to create digital products and services that are intuitive, easy to use, safe and efficient. Understands users needs and goals, applies understanding of user behaviour to develop alternative options and functions, of the digital product, to create a seamless user experience.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Applies digital interfaces options (web, mobile, IoT) and guidelines to achieve usability for all.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Establishes and cultivates relationships with customers and users to understand their tasks, needs and goals. Uses specialist methods to obtain a wide range of significant user engagement.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides expert guidance to ensure continuous improvement and establish a successful omni-channel user experience.');


INSERT INTO competence (code, name, description)
VALUES ('B.1', 'Application Development', 'Interprets the application design to develop a suitable application in accordance with customer needs. Adapts existing solutions by e.g. porting an application to another operating system. Codes, debugs, tests and documents and communicates product development stages. Selects appropriate technical options for development such as reusing, improving or reconfiguration of existing components. Optimises efficiency, cost and quality. Validates results with user representatives, integrates and commissions the overall solution.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Acts under guidance to develop, test and document applications.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Systematically develops and validates applications.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Acts creatively to develop applications and to select appropriate technical options. Accounts for others development activities. Optimizes application development, maintenance and performance by employing design patterns and by reusing proved solutions.');


INSERT INTO competence (code, name, description)
VALUES ('B.2', 'Component Integration', 'Integrates hardware, software or sub system components into an existing or a new system. Complies with established processes and procedures such as, configuration management and package maintenance. Takes into account the compatibility of existing and new modules to ensure system integrity, system interoperability and information security. Verifies and tests system capacity and performance and documentation of successful integration.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Acts systematically to identify compatibility of software and hardware specifications. Documents all activities during installation and records deviations and remedial activities.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Accounts for own and others actions in the integration process. Complies with appropriate standards and change control procedures to maintain integrity of the overall system functionality and reliability.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Exploits wide ranging specialist knowledge to create a process for the entire integration cycle, including the establishment of internal standards of practice. Provides leadership to marshal and assign resources for programs of integration.');


INSERT INTO competence (code, name, description)
VALUES ('B.3', 'Testing', 'Constructs and executes systematic test procedures for ICT systems or customer usability requirements to establish compliance with design specifications. Ensures that new or revised components or systems perform to expectation. Ensures meeting of internal, external, national and international standards; including health and safety, usability, performance, reliability or compatibility. Produces documents and reports to evidence certification requirements.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Performs simple tests in strict compliance with detailed instructions.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Organises test programs and builds scripts to stress test potential vulnerabilities. Records and reports outcomes providing analysis of results.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits specialist knowledge to supervise complex testing programmes. Ensures tests and results are documented to provide input to subsequent process owners such as designers, users or maintainers. Accountable for compliance with testing procedures including a documented audit trail.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Exploits wide ranging specialist knowledge to create a process for the entire testing activity, including the establishment of internal standard of practices. Provides expert guidance and advice to the testing team.');


INSERT INTO competence (code, name, description)
VALUES ('B.4', 'Solution Deployment', 'Following predefined general standards of practice carries out planned necessary interventions to implement solutions and services, including installing, securing, upgrading or decommissioning. Configures hardware, software or network to ensure interoperability of system components and debugs any resultant faults, incompatibilities or losses (damage). Engages additional specialist resources if required, such as third-party network providers. Formally hands over fully operational solution to user ICT management, and completes documentation recording all relevant information, including equipment addressees, configuration and performance data.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Removes or installs components under guidance and in accordance with detailed instructions.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Acts systematically to build or deconstruct system elements. Identifies failing components and establishes root cause failures. Provides support to less experienced colleagues.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Accounts for own and others actions for solution provision and initiates comprehensive communication with stakeholders. Exploits specialist knowledge to influence solution construction providing advice and guidance.');


INSERT INTO competence (code, name, description)
VALUES ('B.5', 'Documentation Production', 'Produces documents by integrating information and maintaining compliance with relevant requirements. Selects the appropriate style and format by determining the media type and presentation mode of the documentation. Creates templates for document-management systems. Ensures that documentation complies with customers’, technical and ICT application development process needs and that existing documents are valid and up to date. Provides support for the development of interactive documents.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Uses and applies standards to define document structure.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Ensures that documentation is complete, correct and provided in a suitable place and format.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Adapts the level of detail to meet the needs of the targeted population.');


INSERT INTO competence (code, name, description)
VALUES ('B.6', 'ICT Systems Engineering', 'Builds the required networks/network connections, components and interfaces. Follows a systematic methodology to analyse and engineer infrastructure platforms or solutions for cloud, IoT and other technologies to meet business and technical requirements. Builds system structure models and conducts system behaviour to integrate physical devices, networks, hardware and/or software components. Ensures information security, data protection and energy efficiency. Performs tests to ensure requirements are met.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Ensures interoperability of the system components. Exploits wide ranging specialist knowledge to create a digital infrastructure that will satisfy the system constraints and meet the customer’s expectations.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Handles complexity by developing standard procedures and architectures in support of cohesive product development. Establishes a set of system requirements that will guide the design of the digital infrastructure. Identifies which system requirements and which functions should be allocated to which elements of the system and/or layers of the infrastructure.');


INSERT INTO competence (code, name, description)
VALUES ('C.1', 'User Support', 'Responds to user requests and issues, recording relevant information. Assures resolution or escalates incidents and optimises system performance in accordance with predefined service level agreements (SLAs). Understands how to monitor solution outcome and resultant customer satisfaction.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Interacts with users, applies basic product knowledge to respond to user requests. Solves incidents, following prescribed procedures.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Systematically interprets user problems and identifies solutions and possible side effects. Uses experience to address user problems and interrogates database for potential solutions. Escalates complex or unresolved incidents. Records and tracks issues from outset to conclusion.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Manages the support process and accountable for agreed SLA. Plans resource allocation to meet defined service level. Acts creatively, and applies continuous service improvement. Manages the support function budget.');


INSERT INTO competence (code, name, description)
VALUES ('C.2', 'Change Support', 'Evaluates, implements and guides the evolution of an ICT solution evaluating changes and their impact. Ensures efficient control and scheduling of software or hardware modifications to prevent multiple upgrades creating unpredictable outcomes. Minimises service disruption as a consequence of changes and adheres to defined service level agreement (SLA). Ensures consideration and compliance with information security procedures.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'During change, acts systematically to respond to day by day operational needs and react to them, avoiding service disruptions and maintaining coherence to (SLA) and information security requirements.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Ensures the integrity of the system by controlling the application of functional updates, software or hardware additions and maintenance activities. Complies with budget requirements.');


INSERT INTO competence (code, name, description)
VALUES ('C.3', 'Service Delivery', 'Ensures service delivery in accordance with established service level agreements (SLA''s). Takes proactive action to ensure stable and secure applications and ICT infrastructure to avoid potential service disruptions, attending to capacity planning and to information security. Updates operational document library and logs all service incidents. Maintains monitoring and management tools (i.e. scripts, procedures). Maintains IS services. Manages all aspects of service availability.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Acts under guidance to record and track reliability data.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Systematically analyses performance data and communicates findings to senior experts. Escalates potential service level failures and security risks, recommends actions to improve service reliability. Tracks reliability data against SLA.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Plans the schedule of operational tasks. Manages costs and budget according to the internal procedures and external constraints. Identifies the optimum number of people required to resource the operational management of the IS infrastructure.');


INSERT INTO competence (code, name, description)
VALUES ('C.4', 'Problem Management', 'Manages the life cycle of incidents and problems. Identifies and resolves the root cause of incidents. Takes a proactive approach to avoidance or identification of root cause of ICT problems. Deploys a knowledge system based on recurrence of common errors. Resolves or escalates incidents. Optimises system or component performance.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Identifies and classifies incident types and service interruptions. Records incidents cataloguing them by symptom and resolution.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits specialist knowledge and in-depth understanding of the ICT infrastructure and problem management process to identify failures and resolve with minimum outage. Makes sound decisions in emotionally charged environments on appropriate action required to minimise business impact. Rapidly identifies failing component, selects alternatives such as repair, replace or reconfigure.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides leadership and is accountable for the entire problem management process. Schedules and ensures well trained human resources, tools, and diagnostic equipment are available to meet emergency incidents. Has depth of expertise to anticipate critical component failure and make provision for recovery with minimum downtime. Constructs escalation processes to ensure that appropriate resources can be applied to each incident.');


INSERT INTO competence (code, name, description)
VALUES ('C.5', 'Systems Management', 'Monitors and controls the IT services and their underlying physical systems and hardware. Manages the hardware, applications, networks, servers, virtual resources and other technical systems. Ensures up-to-date administration of resources, users and authentications. Manages devices in bring-your-own (BYOD) organisation, enabling user productivity and flexibility, preventing data loss, and enhancing data security.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '1', 'Performs basic systems operations.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Systematically manages day by day operational needs across the IT system, avoiding service disruptions according to service and information security strategy.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Optimizes technical and cloud environment. Evaluates performance of systems and the problems/questions of users. Responsible for timely replacement of resources within the permitted budget.');


INSERT INTO competence (code, name, description)
VALUES ('D.1', 'Information Security Strategy Development', 'Defines and makes applicable a formal organisational strategy, scope and culture to maintain safety and security of information from external and internal threats. Analyses the business and technology strategy alongside trends in the threat landscape to anticipate potential vulnerabilities and risk mitigation requirements. Tracks legal, regulatory and social expectations involving the security of services and sensitive data. Provides the foundation for Information Security Management, including role identification and accountability. Uses defined standards to create objectives for information integrity, availability, and data privacy.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Exploits depth of expertise and leverages external standards and best practices');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides strategic leadership to embed information security into the culture of the organisation');


INSERT INTO competence (code, name, description)
VALUES ('D.2', 'ICT Quality Strategy Development', 'Defines, improves and refines a formal strategy to satisfy customer expectations and improve business performance (balance between cost and risks). Identifies critical processes influencing service delivery and product performance for definition in the ICT quality management system. Uses defined standards to formulate objectives for service management, product, data and process quality. Identifies ICT quality management accountability.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Exploits wide ranging specialist knowledge to leverage and authorise the application of external standards and best practices');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides strategic leadership to embed ICT quality (i.e. metrics and continuous improvement) into the culture of the organisation.');


INSERT INTO competence (code, name, description)
VALUES ('D.3', 'Education and Training Provision', 'Defines and implements ICT training policy to address organisational skill needs and gaps. Incorporates these onto internal employee development plans as a tool for enabling career development. Structures, organises and schedules training programs and evaluates training quality through a feedback process and implements continuous improvement. Adapts training plans to address changing demand.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Organises the identification of training needs; collates organisation requirements, identifies, selects and prepares schedule of training interventions.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Acts creatively to analyse skills gaps; elaborates specific requirements and identifies potential sources for training provision. Has specialist knowledge of the training market and establishes a feedback mechanism to assess the added value of alternative training programmes.');


INSERT INTO competence (code, name, description)
VALUES ('D.4', 'Purchasing', 'Applies a consistent procurement procedure, including deployment of the following sub processes: specification requirements; supplier identification; proposal analysis; evaluation of the energy efficiency and environmental compliance of products; suppliers and their processes; contract negotiation; supplier selection and contract placement. Ensures that the entire purchasing process is fit for purpose, compliant to legal requirements and adds value to the organisation.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Understands and applies the principles of the procurement process; places orders based on existing supplier contracts. Ensures the correct execution of orders, including validation of deliverables and correlation with subsequent payments.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits specialist knowledge to deploy the purchasing process, ensuring positive commercial relationships with suppliers. Selects suppliers, products and services by evaluating performance, cost, timeliness and quality. Decides contract placement and complies with organisational policies.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides leadership for the application of the organisation’s procurement policies and makes recommendations for process enhancement. Applies experience and procurement practice expertise to make ultimate purchasing decisions.');


INSERT INTO competence (code, name, description)
VALUES ('D.5', 'Sales Development', 'Establishes a systematic process for the sales and marketing of the organisation’s products and services, including value-added resellers (VARs) if appropriate; including understanding of customer needs, sales forecasting, prospect evaluation and negotiation tactics. Develops technical proposals to meet customer solution requirements and offer competitive bids aligned with the organisation’s capacity to deliver.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Collaborates in the development of proposals compliant with business capacity and customer requirements.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Acts creatively to develop proposals incorporating complex solutions. Customises solutions in a complex technical and legal environment ensuring the feasibility, legal and technical validity of the customer offer.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Reviews and implements appropriate sales strategy to deliver organization goals. Determines and allocates targets to address market conditions. Coordinates multidisciplinary teams.');


INSERT INTO competence (code, name, description)
VALUES ('D.6', 'Digital Marketing', 'Understands the fundamental principles of digital marketing. Distinguishes between the traditional and digital approaches. Appreciates the range of channels available. Assesses the effectiveness of the various approaches and applies rigorous measurement techniques. Plans a coherent strategy using the most effective means available. Understands the data protection and privacy issues involved in the implementation of the marketing strategy.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Understands and applies digital marketing tactics to develop an integrated and effective digital marketing plan using different digital marketing areas such as search, display, e-mail, social media and mobile marketing.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits specialist knowledge to utilise analytical tools and assess the effectiveness of websites in terms of technical performance and download speed. Evaluates the user engagement by the application of a wide range of analytical reports. Knows the legal implications of the approaches adopted.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Develops clear meaningful objectives for the Digital Marketing Plan. Selects appropriate tools and sets budget targets for the channels adopted. Monitors, analyses and enhances the digital marketing activities in an ongoing manner.');


INSERT INTO competence (code, name, description)
VALUES ('D.7', 'Data Science and Analytics', 'Uses and applies data analytic techniques such as data mining, machine learning, prescriptive and predictive analytics to apply data insight to address the organisation’s challenges and opportunities. Identifies, extracts and integrates heterogeneous data from a wide range of sources respecting ethical aspects and guaranteeing compliance with data privacy regulations. Assesses existing data and identifies new data requirements including social networks and open data for organisational benefit.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Searches and collects data. Prepares data from multiple sources and formats for analysis.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Designs and creates data analysis tools to support the organisations data lifecycle. Verifies data veracity. Processes data and visualises the data analysis results to the given domain.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Interprets data analysis results. Performs proper data business analysis. Delivers insight into the organisations data requirements, plan, design, develop and recommend new data sources. Creates new models and algorithms for data driving the strategy. Organizes, synthesizes and translates information to facilitate decision-making.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides leadership to optimise how data is used in the organisation to drive innovation. Uses data to improve processes and to feed/ develop business strategy.');


INSERT INTO competence (code, name, description)
VALUES ('D.8', 'Contract Management', 'Provides and negotiates contract in accordance with organisational processes. Ensures that contract and deliverables are provided on time, meet quality standards, and conform to compliance requirements. Addresses non-compliance, escalates significant issues, drives recovery plans and if necessary amends contracts. Maintains budget integrity. Assesses and addresses supplier compliance to legal, health and safety and security standards. Establishes and maintains supplier relationships and regular communication.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Acts systematically to monitor contract compliance and promptly escalate defaults.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Evaluates contract performance by monitoring performance indicators. Assures performance of the complete supply chain. Influences the terms of contract renewal.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides leadership for contract compliance and is the final escalation point for issue resolution');


INSERT INTO competence (code, name, description)
VALUES ('D.9', 'Personnel Development', 'Diagnoses individual and group competence, identifying skill needs and skill gaps. Reviews training and development options and selects appropriate methodology taking into account the individual, project and business requirements. Coaches and/ or mentors individuals and teams to address learning needs.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Briefs / trains individuals and groups, holds courses of instruction');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Monitors and addressees the development needs of individuals and teams.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Takes proactive action and develops organisational processes to address the development needs of individuals, teams and the entire workforce');


INSERT INTO competence (code, name, description)
VALUES ('D.10', 'Information and Knowledge Management', 'Identifies information and knowledge relevant to the organisation and develops processes and structures to manage it. Creates information structure to enable the exploitation, optimisation and sharing of information. Understands appropriate tools to be deployed to create, extract, maintain, renew and propagate business knowledge in order to capitalise from the information asset.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Analyses business processes and associated information requirements and provides the most appropriate information structure');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Integrates the appropriate information structure into the corporate environment.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Correlates information and knowledge to create value for the business. Applies innovative solutions based on information retrieved.');


INSERT INTO competence (code, name, description)
VALUES ('D.11', 'Needs Identification', 'Actively listens to internal/ external customers, articulates and clarifies their needs. Manages the relationship with all stakeholders to ensure that solutions and services are in line with business requirements. Proposes different solutions (e.g. make-or-buy), by performing contextual analysis in support of user centered system design. Advises the customer on appropriate solution choices. Acts as an advocate engaging in the implementation or configuration process of the chosen solution.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Establishes reliable relationships with customers and helps them clarify their needs.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Exploits wide ranging specialist knowledge of the customers business to offer possible solutions to business needs. Provides expert guidance to the customer by proposing solutions and supplier.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides leadership in support of the customers’ strategic decisions. Helps customer to envisage new ICT solutions, fosters partnerships and creates value propositions.');


INSERT INTO competence (code, name, description)
VALUES ('E.1', 'Forecast Development', 'Interprets market needs and evaluates market acceptance of products or services. Assesses the organisation’s potential to meet future production and quality requirements. Applies relevant metrics to enable accurate decision making in support of production, marketing, sales and distribution functions.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Exploits skills to provide short-term forecast using market inputs and assessing the organisation’s production and selling capabilities.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Acts with wide ranging accountability for the production of a long-term forecast. Understands the global marketplace, identifying and evaluating relevant inputs from the broader business, political and social context.');


INSERT INTO competence (code, name, description)
VALUES ('E.2', 'Project and Portfolio Management', 'Implements plans for a program of change. Plans, directs and manages a single or portfolio of ICT projects or services to ensure co-ordination and management of interdependencies. Orchestrates projects to develop or implement new, internal or externally defined processes to meet identified business needs. Defines activities, responsibilities, critical milestones, resources, skills needs, interfaces and budget, optimises costs and time utilisation, minimises waste and strives for high quality. Develops contingency plans to address potential implementation issues. Delivers project on time, on budget and in accordance with original requirements taking into account changing circumstances. Creates and maintains documents to facilitate monitoring of project progress.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Understands and applies the principles of project management and applies methodologies, tools and processes to manage simple projects, Optimises costs and minimises waste.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Accounts for own and others activities, working within the project boundary, making choices and giving instructions, optimising activities and resources. Manages and supervises relationships within the team; plans and establishes team objectives and outputs and documents results');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Manages complex projects or programmes, including interaction with others. Influences project strategy by proposing new or alternative solutions and balancing effectiveness and efficiency. Is empowered to revise rules and choose standards. Takes overall responsibility for project outcomes, including finance and resource management and works beyond project boundary.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '5', 'Provides strategic leadership for extensive interrelated programmes of work to ensure that Information Technology is a change enabling agent and delivers benefit in line with overall business strategic aims. Applies extensive business and technological mastery to conceive and bring innovative ideas to fruition.');


INSERT INTO competence (code, name, description)
VALUES ('E.3', 'Risk Management', 'Implements the management of risk across information systems through the application of the enterprise defined risk management policy and procedure. Assesses risk to the organisation’s business, including web, cloud and mobile resources. Documents potential risk and containment plans.')
    RETURNING id INTO c_id;

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '2', 'Understands and applies the principles of risk management and investigates ICT solutions to mitigate identified risks.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '3', 'Decides on appropriate actions required to adapt security and address risk exposure. Evaluates, manages and ensures validation of exceptions; audits ICT processes and environment.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES (c_id, '4', 'Provides leadership to define and make applicable a policy for risk management by considering all the possible constraints, including technical, economic and political issues. Delegates assignments.');


INSERT INTO competence (code, name, description)
VALUES ('E.4', 'Relationship Management', 'Develops positive business relationships in a diverse stakeholder environment facilitating multi-disciplinary team collaboration. Maintains regular communication with colleagues, customers, partners and suppliers, displaying empathy with their different contexts and perspectives. Ensures that different stakeholder needs, concerns or complaints are understood and addressed in accordance with organisational policy.');

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.4'), '3', 'Accounts for own and others actions in managing a limited number of stakeholders');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.4'), '4', 'Provides leadership for large or many stakeholder relationships. Authorises investment in new and existing relationships. Leads the design of a workable procedure for maintaining positive business relationships.');


INSERT INTO competence (code, name, description)
VALUES ('E.5', 'Process Improvement', 'Measures effectiveness of existing or new ICT process approaches (Waterfall, Agile, DevOps etc.). Designs and implements process or technology changes supporting the organization through a continuous learning process. Assesses and addresses risks involved in process change.');

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.5'), '3', 'Exploits specialist knowledge to research existing ICT processes and solutions in order to define possible innovations. Makes recommendations based on reasoned arguments.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.5'), '4', 'Provides leadership and authorises implementation of innovations and improvements that will enhance competitiveness or efficiency. Demonstrates to senior management the business advantage of potential changes.');


INSERT INTO competence (code, name, description)
VALUES ('E.6', 'ICT Quality Management', 'Implements ICT quality policy to maintain and enhance service and product provision. Plans and defines indicators to manage quality with respect to ICT strategy. Reviews quality measures and recommends enhancements to influence continuous quality improvement.');

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.6'), '2', 'Communicates and monitors application of the organisation’s quality policy.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.6'), '3', 'Evaluates quality management indicators and processes based on ICT quality policy and proposes remedial action.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.6'), '4', 'Assesses and estimates the degree to which quality requirements have been met and provides leadership for quality policy implementation. Provides cross functional leadership for setting and exceeding quality standards.');


INSERT INTO competence (code, name, description)
VALUES ('E.7', 'Business Change Management', 'Assesses the implications of digital transformation, potential digital disruption and change. Defines the requirements and quantifies the business benefits. Manages change taking into account structural and cultural issues. Maintains business and process continuity throughout change, monitoring the impact, taking any required remedial action and refining approach.');

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.7'), '3', 'Evaluates change requirements and exploits specialist skills to identify possible methods and standards that can be deployed');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.7'), '4', 'Provides leadership to plan, manage and implement significant ICT led business change');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.7'), '5', 'Applies pervasive influence to embed organisational change.');


INSERT INTO competence (code, name, description)
VALUES ('E.8', 'Information Security Management', 'Manages information and systems security policy accounting for technical, human, organisational and other relevant threats, in line with the IT and business strategy and reflecting the risk culture of the organisation. Deploys and manages the operational and specialist (for e.g. forensics, threat intelligence and intrusion detection) resources needed to ensure the capacity to manage security incidents, and makes recommendations for the continuous improvement of security policy and strategy.');

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.8'), '2', 'Systematically scans the environment to identify and define vulnerabilities and threats. Records and escalates non- compliance.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.8'), '3', 'Evaluates security management measures and indicators and decides if compliant to information security policy. Investigates and instigates remedial measures to address any security breaches');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.8'), '4', 'Provides leadership for the integrity, confidentiality and availability of data stored on information systems and complies with all legal requirements.');


INSERT INTO competence (code, name, description)
VALUES ('E.9', 'Information Systems Governance', 'Defines, deploys and controls the management of information systems and services and data in line with the business imperatives. Takes into account all internal and external parameters such as legislation and industry standard compliance to influence risk management and resource deployment to achieve balanced business benefit.');

INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.9'), '4', 'Provides leadership for IS governance strategy by communicating, propagating and controlling relevant processes across the entire ICT infrastructure.');
INSERT INTO competence_level (competence_id, proficiency_level, description) VALUES ((SELECT id FROM competence WHERE code = 'E.9'), '5', 'Defines and aligns the IS governance strategy incorporating it into the organisation’s corporate governance strategy. Adapts the IS governance strategy to take into account new significant events arising from legal, economic, political, business, technological or environmental issues.');
END $$;


DO $$
DECLARE c_id uuid;
BEGIN
INSERT INTO system_config (key, value, description)
VALUES (
           'similarityThreshold',
           '0.55',
           'Minimal cosine similarity score required to consider a competence match (from 0.0 to 1.0)'
       );
END $$;
