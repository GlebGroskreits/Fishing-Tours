PGDMP  %        	             }            Fishka    17.0    17.0 J    Q           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            R           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            S           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            T           1262    18355    Fishka    DATABASE     |   CREATE DATABASE "Fishka" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "Fishka";
                     postgres    false            �            1259    18366    guides    TABLE     �   CREATE TABLE public.guides (
    id_guide integer NOT NULL,
    seniority integer,
    description character varying(255),
    image character varying(255)
);
    DROP TABLE public.guides;
       public         heap r       postgres    false            �            1259    18388    refresh_tokens    TABLE     o   CREATE TABLE public.refresh_tokens (
    id_user integer NOT NULL,
    refresh_token character varying(255)
);
 "   DROP TABLE public.refresh_tokens;
       public         heap r       postgres    false            �            1259    18453    requests    TABLE     f   CREATE TABLE public.requests (
    id integer NOT NULL,
    id_client integer,
    id_tour integer
);
    DROP TABLE public.requests;
       public         heap r       postgres    false            �            1259    18452    requests_id_seq    SEQUENCE     �   CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.requests_id_seq;
       public               postgres    false    231            U           0    0    requests_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;
          public               postgres    false    230            �            1259    18470    reviews    TABLE     �   CREATE TABLE public.reviews (
    id integer NOT NULL,
    id_client integer,
    id_tour integer,
    raiting integer,
    description character varying(255)
);
    DROP TABLE public.reviews;
       public         heap r       postgres    false            �            1259    18469    reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public               postgres    false    233            V           0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public               postgres    false    232            �            1259    18436    tour_actives    TABLE     �   CREATE TABLE public.tour_actives (
    id integer NOT NULL,
    id_tour integer,
    id_guide integer,
    date_start timestamp with time zone,
    status character varying DEFAULT 'reserve'::character varying
);
     DROP TABLE public.tour_actives;
       public         heap r       postgres    false            �            1259    18435    tour_actives_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tour_actives_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tour_actives_id_seq;
       public               postgres    false    229            W           0    0    tour_actives_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tour_actives_id_seq OWNED BY public.tour_actives.id;
          public               postgres    false    228            �            1259    18422 	   tour_days    TABLE     �   CREATE TABLE public.tour_days (
    id integer NOT NULL,
    id_tour integer NOT NULL,
    name character varying(40),
    image character varying(255),
    description character varying(255),
    address character varying(255)
);
    DROP TABLE public.tour_days;
       public         heap r       postgres    false            �            1259    18421    tour_days_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tour_days_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.tour_days_id_seq;
       public               postgres    false    227            X           0    0    tour_days_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.tour_days_id_seq OWNED BY public.tour_days.id;
          public               postgres    false    226            �            1259    18410    tour_galleries    TABLE     �   CREATE TABLE public.tour_galleries (
    id integer NOT NULL,
    id_tour integer NOT NULL,
    image character varying(255)
);
 "   DROP TABLE public.tour_galleries;
       public         heap r       postgres    false            �            1259    18409    tour_galleries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tour_galleries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.tour_galleries_id_seq;
       public               postgres    false    225            Y           0    0    tour_galleries_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.tour_galleries_id_seq OWNED BY public.tour_galleries.id;
          public               postgres    false    224            �            1259    18399    tours    TABLE     $  CREATE TABLE public.tours (
    id integer NOT NULL,
    type character varying(10) DEFAULT 'common'::character varying,
    name character varying(25),
    image character varying(255),
    duration integer,
    description character varying(255),
    cost_people numeric(4,2) DEFAULT 50
);
    DROP TABLE public.tours;
       public         heap r       postgres    false            �            1259    18398    tours_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tours_id_seq;
       public               postgres    false    223            Z           0    0    tours_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tours_id_seq OWNED BY public.tours.id;
          public               postgres    false    222            �            1259    18378    user_personals    TABLE     �   CREATE TABLE public.user_personals (
    id_user integer NOT NULL,
    name character varying(20),
    surname character varying(20),
    patronymic character varying(20),
    birthday timestamp with time zone,
    telephone character varying(255)
);
 "   DROP TABLE public.user_personals;
       public         heap r       postgres    false            �            1259    18357    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    role character varying(20) DEFAULT 'client    '::character varying,
    email character varying(45),
    password character varying(255)
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    18356    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            [           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            �           2604    18456    requests id    DEFAULT     j   ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);
 :   ALTER TABLE public.requests ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    231    231            �           2604    18473 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    232    233            �           2604    18439    tour_actives id    DEFAULT     r   ALTER TABLE ONLY public.tour_actives ALTER COLUMN id SET DEFAULT nextval('public.tour_actives_id_seq'::regclass);
 >   ALTER TABLE public.tour_actives ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    229    229            �           2604    18425    tour_days id    DEFAULT     l   ALTER TABLE ONLY public.tour_days ALTER COLUMN id SET DEFAULT nextval('public.tour_days_id_seq'::regclass);
 ;   ALTER TABLE public.tour_days ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    227    227            �           2604    18413    tour_galleries id    DEFAULT     v   ALTER TABLE ONLY public.tour_galleries ALTER COLUMN id SET DEFAULT nextval('public.tour_galleries_id_seq'::regclass);
 @   ALTER TABLE public.tour_galleries ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    224    225            �           2604    18402    tours id    DEFAULT     d   ALTER TABLE ONLY public.tours ALTER COLUMN id SET DEFAULT nextval('public.tours_id_seq'::regclass);
 7   ALTER TABLE public.tours ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    223    223            �           2604    18360    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            @          0    18366    guides 
   TABLE DATA           I   COPY public.guides (id_guide, seniority, description, image) FROM stdin;
    public               postgres    false    219   aX       B          0    18388    refresh_tokens 
   TABLE DATA           @   COPY public.refresh_tokens (id_user, refresh_token) FROM stdin;
    public               postgres    false    221   �Y       L          0    18453    requests 
   TABLE DATA           :   COPY public.requests (id, id_client, id_tour) FROM stdin;
    public               postgres    false    231   A\       N          0    18470    reviews 
   TABLE DATA           O   COPY public.reviews (id, id_client, id_tour, raiting, description) FROM stdin;
    public               postgres    false    233   r\       J          0    18436    tour_actives 
   TABLE DATA           Q   COPY public.tour_actives (id, id_tour, id_guide, date_start, status) FROM stdin;
    public               postgres    false    229   �\       H          0    18422 	   tour_days 
   TABLE DATA           S   COPY public.tour_days (id, id_tour, name, image, description, address) FROM stdin;
    public               postgres    false    227   i]       F          0    18410    tour_galleries 
   TABLE DATA           <   COPY public.tour_galleries (id, id_tour, image) FROM stdin;
    public               postgres    false    225   -^       D          0    18399    tours 
   TABLE DATA           Z   COPY public.tours (id, type, name, image, duration, description, cost_people) FROM stdin;
    public               postgres    false    223   �^       A          0    18378    user_personals 
   TABLE DATA           a   COPY public.user_personals (id_user, name, surname, patronymic, birthday, telephone) FROM stdin;
    public               postgres    false    220   a       ?          0    18357    users 
   TABLE DATA           :   COPY public.users (id, role, email, password) FROM stdin;
    public               postgres    false    218   Xb       \           0    0    requests_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.requests_id_seq', 18, true);
          public               postgres    false    230            ]           0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 17, true);
          public               postgres    false    232            ^           0    0    tour_actives_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tour_actives_id_seq', 11, true);
          public               postgres    false    228            _           0    0    tour_days_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.tour_days_id_seq', 6, true);
          public               postgres    false    226            `           0    0    tour_galleries_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.tour_galleries_id_seq', 29, true);
          public               postgres    false    224            a           0    0    tours_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tours_id_seq', 8, true);
          public               postgres    false    222            b           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 18, true);
          public               postgres    false    217            �           2606    18372    guides guides_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_pkey PRIMARY KEY (id_guide);
 <   ALTER TABLE ONLY public.guides DROP CONSTRAINT guides_pkey;
       public                 postgres    false    219            �           2606    18392 "   refresh_tokens refresh_tokens_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id_user);
 L   ALTER TABLE ONLY public.refresh_tokens DROP CONSTRAINT refresh_tokens_pkey;
       public                 postgres    false    221            �           2606    18458    requests requests_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_pkey;
       public                 postgres    false    231            �           2606    18475    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public                 postgres    false    233            �           2606    18441    tour_actives tour_actives_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.tour_actives
    ADD CONSTRAINT tour_actives_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.tour_actives DROP CONSTRAINT tour_actives_pkey;
       public                 postgres    false    229            �           2606    18429    tour_days tour_days_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.tour_days
    ADD CONSTRAINT tour_days_pkey PRIMARY KEY (id, id_tour);
 B   ALTER TABLE ONLY public.tour_days DROP CONSTRAINT tour_days_pkey;
       public                 postgres    false    227    227            �           2606    18415 "   tour_galleries tour_galleries_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.tour_galleries
    ADD CONSTRAINT tour_galleries_pkey PRIMARY KEY (id, id_tour);
 L   ALTER TABLE ONLY public.tour_galleries DROP CONSTRAINT tour_galleries_pkey;
       public                 postgres    false    225    225            �           2606    18408    tours tours_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tours DROP CONSTRAINT tours_pkey;
       public                 postgres    false    223            �           2606    18382 "   user_personals user_personals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.user_personals
    ADD CONSTRAINT user_personals_pkey PRIMARY KEY (id_user);
 L   ALTER TABLE ONLY public.user_personals DROP CONSTRAINT user_personals_pkey;
       public                 postgres    false    220            �           2606    18365    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            �           2606    18363    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           2606    18373    guides guides_id_guide_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_id_guide_fkey FOREIGN KEY (id_guide) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.guides DROP CONSTRAINT guides_id_guide_fkey;
       public               postgres    false    4751    219    218            �           2606    18393 *   refresh_tokens refresh_tokens_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.refresh_tokens DROP CONSTRAINT refresh_tokens_id_user_fkey;
       public               postgres    false    4751    218    221            �           2606    18459     requests requests_id_client_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_id_client_fkey;
       public               postgres    false    218    231    4751            �           2606    18464    requests requests_id_tour_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_id_tour_fkey FOREIGN KEY (id_tour) REFERENCES public.tour_actives(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_id_tour_fkey;
       public               postgres    false    229    4765    231            �           2606    18476    reviews reviews_id_client_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_id_client_fkey;
       public               postgres    false    218    233    4751            �           2606    18481    reviews reviews_id_tour_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_id_tour_fkey FOREIGN KEY (id_tour) REFERENCES public.tours(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_id_tour_fkey;
       public               postgres    false    223    4759    233            �           2606    18447 '   tour_actives tour_actives_id_guide_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tour_actives
    ADD CONSTRAINT tour_actives_id_guide_fkey FOREIGN KEY (id_guide) REFERENCES public.guides(id_guide) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.tour_actives DROP CONSTRAINT tour_actives_id_guide_fkey;
       public               postgres    false    219    229    4753            �           2606    18442 &   tour_actives tour_actives_id_tour_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tour_actives
    ADD CONSTRAINT tour_actives_id_tour_fkey FOREIGN KEY (id_tour) REFERENCES public.tours(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.tour_actives DROP CONSTRAINT tour_actives_id_tour_fkey;
       public               postgres    false    223    4759    229            �           2606    18430     tour_days tour_days_id_tour_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tour_days
    ADD CONSTRAINT tour_days_id_tour_fkey FOREIGN KEY (id_tour) REFERENCES public.tours(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.tour_days DROP CONSTRAINT tour_days_id_tour_fkey;
       public               postgres    false    223    227    4759            �           2606    18416 *   tour_galleries tour_galleries_id_tour_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tour_galleries
    ADD CONSTRAINT tour_galleries_id_tour_fkey FOREIGN KEY (id_tour) REFERENCES public.tours(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.tour_galleries DROP CONSTRAINT tour_galleries_id_tour_fkey;
       public               postgres    false    225    4759    223            �           2606    18383 *   user_personals user_personals_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_personals
    ADD CONSTRAINT user_personals_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.user_personals DROP CONSTRAINT user_personals_id_user_fkey;
       public               postgres    false    4751    218    220            @   e  x�e�;r�0Dk�8���mɖ��i��"("�	?qr�P��7).�؇S�Wg��m!��&R0'V��
��a\�ْ���:���ā�W�LX�R v�@}
<q6�ɰUFDm�r"�����р�i����8���׬ˬ8����k��-�N0����ĺ�%5���Z�V<K��aS�nP����a��;a=\NS}���-]:l^�y3T�/R�l�H9�I�1D�J�L��APD$�2��Յ��N���?��ܲɻ�,ƙ
�OrS�EK!���V���~�t����;Xִ���[��b,>6P�����U�^���5v�c�����n*`���f�c��      B   [  x���ێ�0 ���]$<�H�����lb�:@������&;�IV����|���o���%6���EG��膪ň�h�����tuYl���^Yb�m;�u�:n��~)�Ev��N9Y!���.�o��KO8�|>Ĩ���-�u���P#I�M%�3{4��~���f�Q�3}����Ub�7�%vQ$U�{�{�m��g��y��>�T��C����a;�;���a��$d�0�j\���т0H��~�k=av?�U%���Uc��QÌ~a��)����m;}ؤ=���Ŝd�y�i�޴Ҥ�Ť�Y�j�=k�}aL��R�t�n��`�G����N�x��}�O��
���N%�I`�>i�z�FnuX�X�s�.�`h����ksyu��m�N�;���J�å�Tz{��]NK�&Z2F�ěE�D3��L�h���*U�89���0���l;����2�m,�݌A������d�
O�Λ3�.P_�=���)���2�!�	%}�Ʋsc�ώ��/�K��hܭ�_�C�{�lA�iD���3��3T�58���0���w�]�v{�ZV?��h��s���2�u|2�R̲���"}�%I�	=Ĳ�      L   !   x�34�44��24��\� �Ѐ+F��� C{-      N   |   x���A� D��s��gpӭ�nH���0@Eo/�f�o�3�`.õ�^�l�ŋ��,���+3K����'�0.�x޺���zl�8b�=+h>��Avvl	��ywZ�ۙ��a�ow�J�/�'QT      J   [   x�3�4��4202�50�50U00�20 "mc΢��Ԣ�T.CTU��U՘2ˌ�Y�!VE��&Ȋ�Q��sYpZ ;�CA� ��-�      H   �   x�U�M��@F�p�: `�iX�΅��MMSB	TkY���L2��{y�\泭*?p�0�fd1�H��6?�t�e�.�ڭK_���f��eh�˵�+��^���C�(�3)X��c��4���|l�>�� ����G#��@d,<�z���������?�4+\5u�S-���队�<�_��K�      F   o   x�%�;�0 �9�Q��t1�H�z��V�?=��[z�B��� g$��:���(��|���5I�*@ɭyhAxw���l���z��=j���@e0P����E�ӯ���2Q$f      D   L  x�m�Ao�0���_a�x��I���T�p����mb'iY~=��f�PO�~��&U��8��;�`dγ�Gva�3T�*^[iyʮ��V�B)<>NY�gw��Z���e��{�X�'�x���>�ц�@7 �����gް�#��9?�:?���͞ݔ�B�a��{pO0dR�Z���R�%��j�RVr%%bcl���Vd7n�ᙘ�z�q0,�Wp?����8�gd���g�%��p��:�u9%�t�h�=��>@��i���۳SFYMQ�6��U�U)%�*�7`��Al4��I����7�u�w��h�-�?��c�ѡ7É�a�z��Ӊ��+�C����Ie�*r)Pp��jKM�)Z([�*�r#�WB�M��K��0a�}��^ֈs
����/�;�V�9�g�I��:zF�E�-w��kj&)_6B����ܠ�)Œ��\����\�N������[���.���!س�J���dꞌ����My�𷦝�fL]�@�G�!e�37;�2�P�]]���
b�EN���$�EݩW�}�݂	"��"Fm���|����͛YÄ� �����_<8K�      A   @  x�m��j1F�7O�eER�ܛ��PpQZ
W��4L�@f��7#Z�\���;��w��`=,�>�q��K[���-5	%�q)�N7�s, �q�^�$V�"�5,R��|���Ŵ��4B*!i�8�!G�L)x�ɇ +��Z7t�����l�I�WO�t�w���TLix��>3��c�7�F�33�C���N��)�eo[����9w��+�V\�?RT�B(-�A&G�f>k��r�#�oT�BW\�Ts�$4
��*�a�#�]L�mb6�m���'�nt�#���JX�9=�����U!��24�YZ�ľc��      ?   �  x�mн��@��X��i��QE�Aj~��Fi�~wk7�I�ɞ��U&��9�w?H�����j2ө O?;h���Ј|@�̘Z���I��v��I��(�f���3ϩ�Q��^���gI��<�7�<g|��D����Յam���l1F|������.�;rB5࣬ZY�@VL��x�I�h'�-r/�|`(^���?G��8�h��������S������f^ٺ\��+���a8s��:�e�w .���Y�9 ��?t(f�Hr��ן]�ؙ�)c���V�u��qw�~�d(�ޗ�?��+�C	�H�y3@�=�V8��2P��rq�*^������Ƭ�|�n80��w��[�@�x*��$�7)0���k���$m�Ǚ��R�Ȑ����&V^a���]^]��
�l�֌�X�������Jj
H��M�o�����9����]     