--
-- PostgreSQL database dump
--

\restrict 6vV8sLFUaQozvRpPEq9dK9zjWc7kuaepQWNmvmv6Lry7BdsDshcP111Rl3fuUvq

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: CartStatus; Type: TYPE; Schema: public; Owner: brainbook
--

CREATE TYPE public."CartStatus" AS ENUM (
    'ACTIVE',
    'ABANDONED'
);


ALTER TYPE public."CartStatus" OWNER TO brainbook;

--
-- Name: CouponType; Type: TYPE; Schema: public; Owner: brainbook
--

CREATE TYPE public."CouponType" AS ENUM (
    'PERCENT',
    'FIXED_AMOUNT'
);


ALTER TYPE public."CouponType" OWNER TO brainbook;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: brainbook
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED'
);


ALTER TYPE public."OrderStatus" OWNER TO brainbook;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: brainbook
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'COD',
    'BANK_TRANSFER',
    'PAYPAL'
);


ALTER TYPE public."PaymentMethod" OWNER TO brainbook;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: brainbook
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'AUTHORIZED',
    'CAPTURED',
    'FAILED',
    'REFUNDED',
    'PARTIALLY_REFUNDED'
);


ALTER TYPE public."PaymentStatus" OWNER TO brainbook;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: brainbook
--

CREATE TYPE public."UserRole" AS ENUM (
    'CUSTOMER',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO brainbook;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    "userId" text NOT NULL,
    label text,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text,
    "countryCode" text NOT NULL,
    city text NOT NULL,
    "addressLine1" text NOT NULL,
    "addressLine2" text,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Address" OWNER TO brainbook;

--
-- Name: Book; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Book" (
    id integer NOT NULL,
    sku text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    price numeric(10,2) NOT NULL,
    "compareAtPrice" numeric(10,2),
    "imageUrl" text NOT NULL,
    description text NOT NULL,
    "longDescription" text,
    stock integer DEFAULT 0 NOT NULL,
    format text NOT NULL,
    publisher text,
    language text,
    "pageCount" integer,
    isbn10 text,
    dimensions text,
    "ratingAvg" numeric(2,1),
    "reviewCount" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Book" OWNER TO brainbook;

--
-- Name: BookCategory; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."BookCategory" (
    "bookId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."BookCategory" OWNER TO brainbook;

--
-- Name: BookImage; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."BookImage" (
    id integer NOT NULL,
    "bookId" integer NOT NULL,
    url text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."BookImage" OWNER TO brainbook;

--
-- Name: BookImage_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."BookImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BookImage_id_seq" OWNER TO brainbook;

--
-- Name: BookImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."BookImage_id_seq" OWNED BY public."BookImage".id;


--
-- Name: BookTag; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."BookTag" (
    "bookId" integer NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public."BookTag" OWNER TO brainbook;

--
-- Name: Book_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."Book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Book_id_seq" OWNER TO brainbook;

--
-- Name: Book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."Book_id_seq" OWNED BY public."Book".id;


--
-- Name: Cart; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Cart" (
    id text NOT NULL,
    "userId" text,
    "sessionId" text,
    status public."CartStatus" DEFAULT 'ACTIVE'::public."CartStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cart" OWNER TO brainbook;

--
-- Name: CartItem; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."CartItem" (
    id integer NOT NULL,
    "cartId" text NOT NULL,
    "bookId" integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO brainbook;

--
-- Name: CartItem_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."CartItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CartItem_id_seq" OWNER TO brainbook;

--
-- Name: CartItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."CartItem_id_seq" OWNED BY public."CartItem".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Category" OWNER TO brainbook;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO brainbook;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: ContactMessage; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."ContactMessage" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    "orderNumber" text,
    subject text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "readAt" timestamp(3) without time zone
);


ALTER TABLE public."ContactMessage" OWNER TO brainbook;

--
-- Name: ContactMessage_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."ContactMessage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactMessage_id_seq" OWNER TO brainbook;

--
-- Name: ContactMessage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."ContactMessage_id_seq" OWNED BY public."ContactMessage".id;


--
-- Name: Coupon; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Coupon" (
    id integer NOT NULL,
    code text NOT NULL,
    type public."CouponType" NOT NULL,
    value numeric(10,2) NOT NULL,
    "minSubtotal" numeric(10,2),
    "maxUses" integer,
    "usedCount" integer DEFAULT 0 NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Coupon" OWNER TO brainbook;

--
-- Name: Coupon_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."Coupon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Coupon_id_seq" OWNER TO brainbook;

--
-- Name: Coupon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."Coupon_id_seq" OWNED BY public."Coupon".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "orderNumber" text NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "paymentMethod" public."PaymentMethod" NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    "shippingAmount" numeric(10,2) NOT NULL,
    "shippingLabel" text,
    total numeric(10,2) NOT NULL,
    "customerFirstName" text NOT NULL,
    "customerLastName" text NOT NULL,
    "customerEmail" text NOT NULL,
    "customerPhone" text NOT NULL,
    "countryCode" text NOT NULL,
    city text NOT NULL,
    "addressLine1" text NOT NULL,
    "addressLine2" text,
    "orderNotes" text,
    "shippingAddressId" text,
    "couponCode" text,
    "couponDiscount" numeric(10,2),
    "userId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO brainbook;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "orderId" text NOT NULL,
    "bookId" integer,
    "titleSnapshot" text NOT NULL,
    "authorSnapshot" text NOT NULL,
    "imageUrlSnapshot" text NOT NULL,
    "unitPrice" numeric(10,2) NOT NULL,
    quantity integer NOT NULL,
    "lineTotal" numeric(10,2) NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO brainbook;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO brainbook;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    method public."PaymentMethod" NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency text DEFAULT 'USD'::text NOT NULL,
    "transactionId" text,
    "externalReference" text,
    "failureReason" text,
    metadata jsonb,
    "paidAt" timestamp(3) without time zone,
    "refundedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Payment" OWNER TO brainbook;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."Tag" (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Tag" OWNER TO brainbook;

--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: brainbook
--

CREATE SEQUENCE public."Tag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tag_id_seq" OWNER TO brainbook;

--
-- Name: Tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brainbook
--

ALTER SEQUENCE public."Tag_id_seq" OWNED BY public."Tag".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "firstName" text,
    "lastName" text,
    phone text,
    role public."UserRole" DEFAULT 'CUSTOMER'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO brainbook;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: brainbook
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO brainbook;

--
-- Name: Book id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Book" ALTER COLUMN id SET DEFAULT nextval('public."Book_id_seq"'::regclass);


--
-- Name: BookImage id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookImage" ALTER COLUMN id SET DEFAULT nextval('public."BookImage_id_seq"'::regclass);


--
-- Name: CartItem id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."CartItem" ALTER COLUMN id SET DEFAULT nextval('public."CartItem_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: ContactMessage id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."ContactMessage" ALTER COLUMN id SET DEFAULT nextval('public."ContactMessage_id_seq"'::regclass);


--
-- Name: Coupon id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Coupon" ALTER COLUMN id SET DEFAULT nextval('public."Coupon_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: Tag id; Type: DEFAULT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN id SET DEFAULT nextval('public."Tag_id_seq"'::regclass);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Address" (id, "userId", label, "firstName", "lastName", phone, "countryCode", city, "addressLine1", "addressLine2", "isDefault", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Book; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Book" (id, sku, slug, title, author, price, "compareAtPrice", "imageUrl", description, "longDescription", stock, format, publisher, language, "pageCount", isbn10, dimensions, "ratingAvg", "reviewCount", "isActive", "createdAt", "updatedAt") FROM stdin;
1	BKB-0012	the-fine-print	The Fine Print	Lauren Asher	28.99	\N	/images/product-item1.png	Rowan: I'm in the business of creating fairy tales. Theme parks. Production companies.	The first book in the Dreamland Billionaires series.	15	Paperback	Piatkus Books	English	448	0349433441	12.6 x 3.2 x 19.6 cm	4.5	24	t	2026-04-18 07:14:18.525	2026-04-18 07:14:18.525
2	BKB-0013	heartland-stars	Heartland Stars	Lauren Asher	25.00	\N	/images/product-item2.png	A sweeping story set in the heartland.	\N	40	Paperback	\N	\N	\N	\N	\N	5.0	18	t	2026-04-18 07:14:18.59	2026-04-18 07:14:18.59
\.


--
-- Data for Name: BookCategory; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."BookCategory" ("bookId", "categoryId") FROM stdin;
1	1
1	2
2	1
\.


--
-- Data for Name: BookImage; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."BookImage" (id, "bookId", url, "sortOrder") FROM stdin;
3	1	/images/product-item1.png	0
4	1	/images/product-item1.png	1
\.


--
-- Data for Name: BookTag; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."BookTag" ("bookId", "tagId") FROM stdin;
1	1
2	1
\.


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Cart" (id, "userId", "sessionId", status, "createdAt", "updatedAt") FROM stdin;
cmo45fdy60000afxsh1rztuqm	\N	37f3f680-f059-42a8-8b7c-43a9ba2daddf	ACTIVE	2026-04-18 09:42:46.876	2026-04-18 09:42:46.876
\.


--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."CartItem" (id, "cartId", "bookId", quantity, "createdAt", "updatedAt") FROM stdin;
1	cmo45fdy60000afxsh1rztuqm	1	1	2026-04-18 09:42:53.267	2026-04-18 09:42:53.267
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Category" (id, name, slug, "createdAt") FROM stdin;
1	Romance	romance	2026-04-18 07:14:18.392
2	Fiction	fiction	2026-04-18 07:14:18.504
\.


--
-- Data for Name: ContactMessage; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."ContactMessage" (id, name, email, phone, "orderNumber", subject, message, "createdAt", "readAt") FROM stdin;
\.


--
-- Data for Name: Coupon; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Coupon" (id, code, type, value, "minSubtotal", "maxUses", "usedCount", "expiresAt", "isActive", "createdAt") FROM stdin;
1	WELCOME10	PERCENT	10.00	20.00	1000	0	\N	t	2026-04-18 07:14:18.595
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Order" (id, "orderNumber", status, "paymentMethod", subtotal, "shippingAmount", "shippingLabel", total, "customerFirstName", "customerLastName", "customerEmail", "customerPhone", "countryCode", city, "addressLine1", "addressLine2", "orderNotes", "shippingAddressId", "couponCode", "couponDiscount", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."OrderItem" (id, "orderId", "bookId", "titleSnapshot", "authorSnapshot", "imageUrlSnapshot", "unitPrice", quantity, "lineTotal") FROM stdin;
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Payment" (id, "orderId", method, status, amount, currency, "transactionId", "externalReference", "failureReason", metadata, "paidAt", "refundedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."Tag" (id, name, slug, "createdAt") FROM stdin;
1	Bestseller	bestseller	2026-04-18 07:14:18.507
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public."User" (id, email, "passwordHash", "firstName", "lastName", phone, role, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: brainbook
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5f8ffe5c-e068-4577-95a3-ba6463563f2e	e6d2beff558c6b28614d022751420659f1de18699b97e29a11c2536d50847790	2026-04-18 14:14:13.354111+07	20260418120000_init	\N	\N	2026-04-18 14:14:13.277212+07	1
\.


--
-- Name: BookImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."BookImage_id_seq"', 4, true);


--
-- Name: Book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."Book_id_seq"', 2, true);


--
-- Name: CartItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."CartItem_id_seq"', 1, true);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."Category_id_seq"', 2, true);


--
-- Name: ContactMessage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."ContactMessage_id_seq"', 1, false);


--
-- Name: Coupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."Coupon_id_seq"', 1, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 1, false);


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brainbook
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 1, true);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: BookCategory BookCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookCategory"
    ADD CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("bookId", "categoryId");


--
-- Name: BookImage BookImage_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookImage"
    ADD CONSTRAINT "BookImage_pkey" PRIMARY KEY (id);


--
-- Name: BookTag BookTag_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookTag"
    ADD CONSTRAINT "BookTag_pkey" PRIMARY KEY ("bookId", "tagId");


--
-- Name: Book Book_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY (id);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: ContactMessage ContactMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."ContactMessage"
    ADD CONSTRAINT "ContactMessage_pkey" PRIMARY KEY (id);


--
-- Name: Coupon Coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Coupon"
    ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Address_userId_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "Address_userId_idx" ON public."Address" USING btree ("userId");


--
-- Name: BookImage_bookId_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "BookImage_bookId_idx" ON public."BookImage" USING btree ("bookId");


--
-- Name: Book_sku_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Book_sku_key" ON public."Book" USING btree (sku);


--
-- Name: Book_slug_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Book_slug_key" ON public."Book" USING btree (slug);


--
-- Name: CartItem_cartId_bookId_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "CartItem_cartId_bookId_key" ON public."CartItem" USING btree ("cartId", "bookId");


--
-- Name: Cart_sessionId_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "Cart_sessionId_idx" ON public."Cart" USING btree ("sessionId");


--
-- Name: Cart_sessionId_status_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "Cart_sessionId_status_idx" ON public."Cart" USING btree ("sessionId", status);


--
-- Name: Cart_userId_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Cart_userId_key" ON public."Cart" USING btree ("userId");


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: Coupon_code_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Coupon_code_key" ON public."Coupon" USING btree (code);


--
-- Name: OrderItem_orderId_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "OrderItem_orderId_idx" ON public."OrderItem" USING btree ("orderId");


--
-- Name: Order_customerEmail_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "Order_customerEmail_idx" ON public."Order" USING btree ("customerEmail");


--
-- Name: Order_orderNumber_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Order_orderNumber_key" ON public."Order" USING btree ("orderNumber");


--
-- Name: Payment_orderId_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "Payment_orderId_idx" ON public."Payment" USING btree ("orderId");


--
-- Name: Payment_status_idx; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE INDEX "Payment_status_idx" ON public."Payment" USING btree (status);


--
-- Name: Payment_transactionId_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Payment_transactionId_key" ON public."Payment" USING btree ("transactionId");


--
-- Name: Tag_slug_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "Tag_slug_key" ON public."Tag" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: brainbook
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BookCategory BookCategory_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookCategory"
    ADD CONSTRAINT "BookCategory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BookCategory BookCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookCategory"
    ADD CONSTRAINT "BookCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BookImage BookImage_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookImage"
    ADD CONSTRAINT "BookImage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BookTag BookTag_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookTag"
    ADD CONSTRAINT "BookTag_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BookTag BookTag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."BookTag"
    ADD CONSTRAINT "BookTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CartItem CartItem_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CartItem CartItem_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_shippingAddressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES public."Address"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Payment Payment_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brainbook
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 6vV8sLFUaQozvRpPEq9dK9zjWc7kuaepQWNmvmv6Lry7BdsDshcP111Rl3fuUvq

