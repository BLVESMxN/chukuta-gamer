--
-- PostgreSQL database dump
--

-- Dumped from database version 13.16
-- Dumped by pg_dump version 13.16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: academico_asignatura; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_asignatura (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    grado_id bigint NOT NULL
);


ALTER TABLE public.academico_asignatura OWNER TO devuser;

--
-- Name: academico_asignatura_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_asignatura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_asignatura_id_seq OWNER TO devuser;

--
-- Name: academico_asignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_asignatura_id_seq OWNED BY public.academico_asignatura.id;


--
-- Name: academico_asignaturaestudiante; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_asignaturaestudiante (
    id bigint NOT NULL,
    promedio numeric(5,2) NOT NULL,
    asignatura_periodo_id bigint NOT NULL,
    estudiante_id bigint NOT NULL
);


ALTER TABLE public.academico_asignaturaestudiante OWNER TO devuser;

--
-- Name: academico_asignaturaestudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_asignaturaestudiante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_asignaturaestudiante_id_seq OWNER TO devuser;

--
-- Name: academico_asignaturaestudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_asignaturaestudiante_id_seq OWNED BY public.academico_asignaturaestudiante.id;


--
-- Name: academico_asignaturaperiodo; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_asignaturaperiodo (
    id bigint NOT NULL,
    asignatura_id bigint NOT NULL,
    periodo_id bigint NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.academico_asignaturaperiodo OWNER TO devuser;

--
-- Name: academico_asignaturaperiodo_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_asignaturaperiodo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_asignaturaperiodo_id_seq OWNER TO devuser;

--
-- Name: academico_asignaturaperiodo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_asignaturaperiodo_id_seq OWNED BY public.academico_asignaturaperiodo.id;


--
-- Name: academico_asistencia; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_asistencia (
    id bigint NOT NULL,
    fecha timestamp with time zone NOT NULL,
    estado_asisten integer NOT NULL,
    asignatura_estudiante_id bigint NOT NULL
);


ALTER TABLE public.academico_asistencia OWNER TO devuser;

--
-- Name: academico_asistencia_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_asistencia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_asistencia_id_seq OWNER TO devuser;

--
-- Name: academico_asistencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_asistencia_id_seq OWNED BY public.academico_asistencia.id;


--
-- Name: academico_estadoasistencia; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_estadoasistencia (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.academico_estadoasistencia OWNER TO devuser;

--
-- Name: academico_estadoasistencia_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_estadoasistencia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_estadoasistencia_id_seq OWNER TO devuser;

--
-- Name: academico_estadoasistencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_estadoasistencia_id_seq OWNED BY public.academico_estadoasistencia.id;


--
-- Name: academico_estadotarea; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_estadotarea (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.academico_estadotarea OWNER TO devuser;

--
-- Name: academico_estadotarea_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_estadotarea_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_estadotarea_id_seq OWNER TO devuser;

--
-- Name: academico_estadotarea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_estadotarea_id_seq OWNED BY public.academico_estadotarea.id;


--
-- Name: academico_estudiante; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_estudiante (
    id bigint NOT NULL,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    fecha_nacimiento date NOT NULL
);


ALTER TABLE public.academico_estudiante OWNER TO devuser;

--
-- Name: academico_estudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_estudiante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_estudiante_id_seq OWNER TO devuser;

--
-- Name: academico_estudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_estudiante_id_seq OWNED BY public.academico_estudiante.id;


--
-- Name: academico_grado; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_grado (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.academico_grado OWNER TO devuser;

--
-- Name: academico_grado_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_grado_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_grado_id_seq OWNER TO devuser;

--
-- Name: academico_grado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_grado_id_seq OWNED BY public.academico_grado.id;


--
-- Name: academico_licencia; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_licencia (
    id bigint NOT NULL,
    texto character varying(100) NOT NULL,
    asistencia_id bigint NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.academico_licencia OWNER TO devuser;

--
-- Name: academico_licencia_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_licencia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_licencia_id_seq OWNER TO devuser;

--
-- Name: academico_licencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_licencia_id_seq OWNED BY public.academico_licencia.id;


--
-- Name: academico_periodo; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_periodo (
    id bigint NOT NULL,
    anio integer NOT NULL,
    trimestre integer NOT NULL
);


ALTER TABLE public.academico_periodo OWNER TO devuser;

--
-- Name: academico_periodo_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_periodo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_periodo_id_seq OWNER TO devuser;

--
-- Name: academico_periodo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_periodo_id_seq OWNED BY public.academico_periodo.id;


--
-- Name: academico_tarea; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_tarea (
    id bigint NOT NULL,
    descripcion character varying(100) NOT NULL,
    fecha_inicio timestamp with time zone NOT NULL,
    fecha_fin timestamp with time zone NOT NULL,
    asignatura_id bigint NOT NULL
);


ALTER TABLE public.academico_tarea OWNER TO devuser;

--
-- Name: academico_tarea_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_tarea_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_tarea_id_seq OWNER TO devuser;

--
-- Name: academico_tarea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_tarea_id_seq OWNED BY public.academico_tarea.id;


--
-- Name: academico_tareaestudiante; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.academico_tareaestudiante (
    id bigint NOT NULL,
    calificacion numeric(5,2) NOT NULL,
    estado_tarea_id bigint NOT NULL,
    estudiante_id bigint NOT NULL,
    tarea_id bigint NOT NULL
);


ALTER TABLE public.academico_tareaestudiante OWNER TO devuser;

--
-- Name: academico_tareaestudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.academico_tareaestudiante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academico_tareaestudiante_id_seq OWNER TO devuser;

--
-- Name: academico_tareaestudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.academico_tareaestudiante_id_seq OWNED BY public.academico_tareaestudiante.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO devuser;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO devuser;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO devuser;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO devuser;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO devuser;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO devuser;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO devuser;

--
-- Name: core_role; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_role (
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    role_name character varying(255) NOT NULL
);


ALTER TABLE public.core_role OWNER TO devuser;

--
-- Name: core_role_groups; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_role_groups (
    id bigint NOT NULL,
    role_id character varying(255) NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.core_role_groups OWNER TO devuser;

--
-- Name: core_role_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_role_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_role_groups_id_seq OWNER TO devuser;

--
-- Name: core_role_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_role_groups_id_seq OWNED BY public.core_role_groups.id;


--
-- Name: core_role_user_permissions; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_role_user_permissions (
    id bigint NOT NULL,
    role_id character varying(255) NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.core_role_user_permissions OWNER TO devuser;

--
-- Name: core_role_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_role_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_role_user_permissions_id_seq OWNER TO devuser;

--
-- Name: core_role_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_role_user_permissions_id_seq OWNED BY public.core_role_user_permissions.id;


--
-- Name: core_session; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_session (
    id bigint NOT NULL,
    login_time timestamp with time zone NOT NULL,
    logout_time timestamp with time zone,
    user_id bigint NOT NULL
);


ALTER TABLE public.core_session OWNER TO devuser;

--
-- Name: core_session_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_session_id_seq OWNER TO devuser;

--
-- Name: core_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_session_id_seq OWNED BY public.core_session.id;


--
-- Name: core_user; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    role_id character varying(255)
);


ALTER TABLE public.core_user OWNER TO devuser;

--
-- Name: core_user_groups; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_user_groups (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.core_user_groups OWNER TO devuser;

--
-- Name: core_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_groups_id_seq OWNER TO devuser;

--
-- Name: core_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_user_groups_id_seq OWNED BY public.core_user_groups.id;


--
-- Name: core_user_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_id_seq OWNER TO devuser;

--
-- Name: core_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_user_id_seq OWNED BY public.core_user.id;


--
-- Name: core_user_user_permissions; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_user_user_permissions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.core_user_user_permissions OWNER TO devuser;

--
-- Name: core_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_user_permissions_id_seq OWNER TO devuser;

--
-- Name: core_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_user_user_permissions_id_seq OWNED BY public.core_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO devuser;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO devuser;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO devuser;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO devuser;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO devuser;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO devuser;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO devuser;

--
-- Name: foro_foro; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.foro_foro (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.foro_foro OWNER TO devuser;

--
-- Name: foro_foro_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.foro_foro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.foro_foro_id_seq OWNER TO devuser;

--
-- Name: foro_foro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.foro_foro_id_seq OWNED BY public.foro_foro.id;


--
-- Name: foro_mensaje; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.foro_mensaje (
    id bigint NOT NULL,
    fecha_hora timestamp with time zone NOT NULL,
    texto character varying(1000) NOT NULL,
    foro_id bigint NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.foro_mensaje OWNER TO devuser;

--
-- Name: foro_mensaje_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.foro_mensaje_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.foro_mensaje_id_seq OWNER TO devuser;

--
-- Name: foro_mensaje_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.foro_mensaje_id_seq OWNED BY public.foro_mensaje.id;


--
-- Name: item_brand; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.item_brand (
    id bigint NOT NULL,
    marca character varying(100) NOT NULL
);


ALTER TABLE public.item_brand OWNER TO devuser;

--
-- Name: item_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.item_brand_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_brand_id_seq OWNER TO devuser;

--
-- Name: item_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.item_brand_id_seq OWNED BY public.item_brand.id;


--
-- Name: item_category; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.item_category (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.item_category OWNER TO devuser;

--
-- Name: item_category_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.item_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_category_id_seq OWNER TO devuser;

--
-- Name: item_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.item_category_id_seq OWNED BY public.item_category.id;


--
-- Name: item_item; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.item_item (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    description text NOT NULL,
    link character varying(255) NOT NULL,
    serial_number character varying(100) NOT NULL,
    quantity integer NOT NULL,
    image character varying(100),
    marca_id bigint,
    quantity_on_loan integer NOT NULL,
    CONSTRAINT item_item_quantity_check CHECK ((quantity >= 0)),
    CONSTRAINT item_item_quantity_on_loan_check CHECK ((quantity_on_loan >= 0))
);


ALTER TABLE public.item_item OWNER TO devuser;

--
-- Name: item_item_categories; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.item_item_categories (
    id bigint NOT NULL,
    item_id bigint NOT NULL,
    category_id bigint NOT NULL
);


ALTER TABLE public.item_item_categories OWNER TO devuser;

--
-- Name: item_item_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.item_item_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_item_categories_id_seq OWNER TO devuser;

--
-- Name: item_item_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.item_item_categories_id_seq OWNED BY public.item_item_categories.id;


--
-- Name: item_item_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.item_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_item_id_seq OWNER TO devuser;

--
-- Name: item_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.item_item_id_seq OWNED BY public.item_item.id;


--
-- Name: loan_prestamo; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.loan_prestamo (
    id bigint NOT NULL,
    fecha_prestamo timestamp with time zone NOT NULL,
    fecha_devolucion timestamp with time zone NOT NULL,
    devuelto boolean NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.loan_prestamo OWNER TO devuser;

--
-- Name: loan_prestamo_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.loan_prestamo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loan_prestamo_id_seq OWNER TO devuser;

--
-- Name: loan_prestamo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.loan_prestamo_id_seq OWNED BY public.loan_prestamo.id;


--
-- Name: loan_prestamoitem; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.loan_prestamoitem (
    id bigint NOT NULL,
    cantidad integer NOT NULL,
    item_id bigint NOT NULL,
    prestamo_id bigint NOT NULL,
    CONSTRAINT loan_prestamoitem_cantidad_check CHECK ((cantidad >= 0))
);


ALTER TABLE public.loan_prestamoitem OWNER TO devuser;

--
-- Name: loan_prestamoitem_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.loan_prestamoitem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loan_prestamoitem_id_seq OWNER TO devuser;

--
-- Name: loan_prestamoitem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.loan_prestamoitem_id_seq OWNED BY public.loan_prestamoitem.id;


--
-- Name: password_history_passwordhistory; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.password_history_passwordhistory (
    id integer NOT NULL,
    password character varying(255) NOT NULL,
    date timestamp with time zone NOT NULL,
    user_config_id integer NOT NULL
);


ALTER TABLE public.password_history_passwordhistory OWNER TO devuser;

--
-- Name: password_history_passwordhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.password_history_passwordhistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.password_history_passwordhistory_id_seq OWNER TO devuser;

--
-- Name: password_history_passwordhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.password_history_passwordhistory_id_seq OWNED BY public.password_history_passwordhistory.id;


--
-- Name: password_history_userpasswordhistoryconfig; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.password_history_userpasswordhistoryconfig (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    salt character varying(120) NOT NULL,
    iterations integer,
    user_id bigint NOT NULL
);


ALTER TABLE public.password_history_userpasswordhistoryconfig OWNER TO devuser;

--
-- Name: password_history_userpasswordhistoryconfig_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.password_history_userpasswordhistoryconfig_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.password_history_userpasswordhistoryconfig_id_seq OWNER TO devuser;

--
-- Name: password_history_userpasswordhistoryconfig_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.password_history_userpasswordhistoryconfig_id_seq OWNED BY public.password_history_userpasswordhistoryconfig.id;


--
-- Name: academico_asignatura id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignatura ALTER COLUMN id SET DEFAULT nextval('public.academico_asignatura_id_seq'::regclass);


--
-- Name: academico_asignaturaestudiante id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaestudiante ALTER COLUMN id SET DEFAULT nextval('public.academico_asignaturaestudiante_id_seq'::regclass);


--
-- Name: academico_asignaturaperiodo id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaperiodo ALTER COLUMN id SET DEFAULT nextval('public.academico_asignaturaperiodo_id_seq'::regclass);


--
-- Name: academico_asistencia id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asistencia ALTER COLUMN id SET DEFAULT nextval('public.academico_asistencia_id_seq'::regclass);


--
-- Name: academico_estadoasistencia id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_estadoasistencia ALTER COLUMN id SET DEFAULT nextval('public.academico_estadoasistencia_id_seq'::regclass);


--
-- Name: academico_estadotarea id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_estadotarea ALTER COLUMN id SET DEFAULT nextval('public.academico_estadotarea_id_seq'::regclass);


--
-- Name: academico_estudiante id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_estudiante ALTER COLUMN id SET DEFAULT nextval('public.academico_estudiante_id_seq'::regclass);


--
-- Name: academico_grado id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_grado ALTER COLUMN id SET DEFAULT nextval('public.academico_grado_id_seq'::regclass);


--
-- Name: academico_licencia id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_licencia ALTER COLUMN id SET DEFAULT nextval('public.academico_licencia_id_seq'::regclass);


--
-- Name: academico_periodo id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_periodo ALTER COLUMN id SET DEFAULT nextval('public.academico_periodo_id_seq'::regclass);


--
-- Name: academico_tarea id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tarea ALTER COLUMN id SET DEFAULT nextval('public.academico_tarea_id_seq'::regclass);


--
-- Name: academico_tareaestudiante id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tareaestudiante ALTER COLUMN id SET DEFAULT nextval('public.academico_tareaestudiante_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: core_role_groups id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_groups ALTER COLUMN id SET DEFAULT nextval('public.core_role_groups_id_seq'::regclass);


--
-- Name: core_role_user_permissions id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.core_role_user_permissions_id_seq'::regclass);


--
-- Name: core_session id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_session ALTER COLUMN id SET DEFAULT nextval('public.core_session_id_seq'::regclass);


--
-- Name: core_user id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user ALTER COLUMN id SET DEFAULT nextval('public.core_user_id_seq'::regclass);


--
-- Name: core_user_groups id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_groups ALTER COLUMN id SET DEFAULT nextval('public.core_user_groups_id_seq'::regclass);


--
-- Name: core_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.core_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: foro_foro id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.foro_foro ALTER COLUMN id SET DEFAULT nextval('public.foro_foro_id_seq'::regclass);


--
-- Name: foro_mensaje id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.foro_mensaje ALTER COLUMN id SET DEFAULT nextval('public.foro_mensaje_id_seq'::regclass);


--
-- Name: item_brand id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_brand ALTER COLUMN id SET DEFAULT nextval('public.item_brand_id_seq'::regclass);


--
-- Name: item_category id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_category ALTER COLUMN id SET DEFAULT nextval('public.item_category_id_seq'::regclass);


--
-- Name: item_item id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item ALTER COLUMN id SET DEFAULT nextval('public.item_item_id_seq'::regclass);


--
-- Name: item_item_categories id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item_categories ALTER COLUMN id SET DEFAULT nextval('public.item_item_categories_id_seq'::regclass);


--
-- Name: loan_prestamo id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.loan_prestamo ALTER COLUMN id SET DEFAULT nextval('public.loan_prestamo_id_seq'::regclass);


--
-- Name: loan_prestamoitem id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.loan_prestamoitem ALTER COLUMN id SET DEFAULT nextval('public.loan_prestamoitem_id_seq'::regclass);


--
-- Name: password_history_passwordhistory id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_passwordhistory ALTER COLUMN id SET DEFAULT nextval('public.password_history_passwordhistory_id_seq'::regclass);


--
-- Name: password_history_userpasswordhistoryconfig id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_userpasswordhistoryconfig ALTER COLUMN id SET DEFAULT nextval('public.password_history_userpasswordhistoryconfig_id_seq'::regclass);


--
-- Data for Name: academico_asignatura; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_asignatura (id, nombre, grado_id) FROM stdin;
\.


--
-- Data for Name: academico_asignaturaestudiante; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_asignaturaestudiante (id, promedio, asignatura_periodo_id, estudiante_id) FROM stdin;
\.


--
-- Data for Name: academico_asignaturaperiodo; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_asignaturaperiodo (id, asignatura_id, periodo_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: academico_asistencia; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_asistencia (id, fecha, estado_asisten, asignatura_estudiante_id) FROM stdin;
\.


--
-- Data for Name: academico_estadoasistencia; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_estadoasistencia (id, nombre) FROM stdin;
\.


--
-- Data for Name: academico_estadotarea; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_estadotarea (id, nombre) FROM stdin;
\.


--
-- Data for Name: academico_estudiante; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_estudiante (id, nombres, apellidos, fecha_nacimiento) FROM stdin;
\.


--
-- Data for Name: academico_grado; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_grado (id, nombre) FROM stdin;
\.


--
-- Data for Name: academico_licencia; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_licencia (id, texto, asistencia_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: academico_periodo; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_periodo (id, anio, trimestre) FROM stdin;
\.


--
-- Data for Name: academico_tarea; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_tarea (id, descripcion, fecha_inicio, fecha_fin, asignatura_id) FROM stdin;
\.


--
-- Data for Name: academico_tareaestudiante; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.academico_tareaestudiante (id, calificacion, estado_tarea_id, estudiante_id, tarea_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add Old password	6	add_passwordhistory
22	Can change Old password	6	change_passwordhistory
23	Can delete Old password	6	delete_passwordhistory
24	Can view Old password	6	view_passwordhistory
25	Can add Configuration	7	add_userpasswordhistoryconfig
26	Can change Configuration	7	change_userpasswordhistoryconfig
27	Can delete Configuration	7	delete_userpasswordhistoryconfig
28	Can view Configuration	7	view_userpasswordhistoryconfig
29	Can add user	8	add_user
30	Can change user	8	change_user
31	Can delete user	8	delete_user
32	Can view user	8	view_user
33	Modification of self's account password	8	own_password_modification
34	Modification of self's account phone number	8	own_phone_modification
35	Can add role	9	add_role
36	Can change role	9	change_role
37	Can delete role	9	delete_role
38	Can view role	9	view_role
39	Can add lab admin	10	add_labadmin
40	Can change lab admin	10	change_labadmin
41	Can delete lab admin	10	delete_labadmin
42	Can view lab admin	10	view_labadmin
43	Creation of lab admin users	10	lab_admin_creation
44	Modification of lab admin users	10	lab_admin_modification
45	Deletion of assistant users	10	assistant_inactivation
46	Modification of assistant users	10	assistant_modification
47	Creation of assistan users	10	assistant_creation
48	Can add lab assistant	11	add_labassistant
49	Can change lab assistant	11	change_labassistant
50	Can delete lab assistant	11	delete_labassistant
51	Can view lab assistant	11	view_labassistant
52	Can add session	12	add_session
53	Can change session	12	change_session
54	Can delete session	12	delete_session
55	Can view session	12	view_session
56	Can add Token	13	add_token
57	Can change Token	13	change_token
58	Can delete Token	13	delete_token
59	Can view Token	13	view_token
60	Can add token	14	add_tokenproxy
61	Can change token	14	change_tokenproxy
62	Can delete token	14	delete_tokenproxy
63	Can view token	14	view_tokenproxy
64	Can add brand	15	add_brand
65	Can change brand	15	change_brand
66	Can delete brand	15	delete_brand
67	Can view brand	15	view_brand
68	Can add category	16	add_category
69	Can change category	16	change_category
70	Can delete category	16	delete_category
71	Can view category	16	view_category
72	Can add item	17	add_item
73	Can change item	17	change_item
74	Can delete item	17	delete_item
75	Can view item	17	view_item
76	Can add prestamo	18	add_prestamo
77	Can change prestamo	18	change_prestamo
78	Can delete prestamo	18	delete_prestamo
79	Can view prestamo	18	view_prestamo
80	Can add prestamo item	19	add_prestamoitem
81	Can change prestamo item	19	change_prestamoitem
82	Can delete prestamo item	19	delete_prestamoitem
83	Can view prestamo item	19	view_prestamoitem
84	Can add asignatura	20	add_asignatura
85	Can change asignatura	20	change_asignatura
86	Can delete asignatura	20	delete_asignatura
87	Can view asignatura	20	view_asignatura
88	Can add asignatura estudiante	21	add_asignaturaestudiante
89	Can change asignatura estudiante	21	change_asignaturaestudiante
90	Can delete asignatura estudiante	21	delete_asignaturaestudiante
91	Can view asignatura estudiante	21	view_asignaturaestudiante
92	Can add asistencia	22	add_asistencia
93	Can change asistencia	22	change_asistencia
94	Can delete asistencia	22	delete_asistencia
95	Can view asistencia	22	view_asistencia
96	Can add estado asistencia	23	add_estadoasistencia
97	Can change estado asistencia	23	change_estadoasistencia
98	Can delete estado asistencia	23	delete_estadoasistencia
99	Can view estado asistencia	23	view_estadoasistencia
100	Can add estado tarea	24	add_estadotarea
101	Can change estado tarea	24	change_estadotarea
102	Can delete estado tarea	24	delete_estadotarea
103	Can view estado tarea	24	view_estadotarea
104	Can add estudiante	25	add_estudiante
105	Can change estudiante	25	change_estudiante
106	Can delete estudiante	25	delete_estudiante
107	Can view estudiante	25	view_estudiante
108	Can add grado	26	add_grado
109	Can change grado	26	change_grado
110	Can delete grado	26	delete_grado
111	Can view grado	26	view_grado
112	Can add periodo	27	add_periodo
113	Can change periodo	27	change_periodo
114	Can delete periodo	27	delete_periodo
115	Can view periodo	27	view_periodo
116	Can add tarea	28	add_tarea
117	Can change tarea	28	change_tarea
118	Can delete tarea	28	delete_tarea
119	Can view tarea	28	view_tarea
120	Can add licencia	29	add_licencia
121	Can change licencia	29	change_licencia
122	Can delete licencia	29	delete_licencia
123	Can view licencia	29	view_licencia
124	Can add asignatura periodo	30	add_asignaturaperiodo
125	Can change asignatura periodo	30	change_asignaturaperiodo
126	Can delete asignatura periodo	30	delete_asignaturaperiodo
127	Can view asignatura periodo	30	view_asignaturaperiodo
128	Can add tarea estudiante	31	add_tareaestudiante
129	Can change tarea estudiante	31	change_tareaestudiante
130	Can delete tarea estudiante	31	delete_tareaestudiante
131	Can view tarea estudiante	31	view_tareaestudiante
132	Can add foro	32	add_foro
133	Can change foro	32	change_foro
134	Can delete foro	32	delete_foro
135	Can view foro	32	view_foro
136	Can add mensaje	33	add_mensaje
137	Can change mensaje	33	change_mensaje
138	Can delete mensaje	33	delete_mensaje
139	Can view mensaje	33	view_mensaje
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
\.


--
-- Data for Name: core_role; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_role (password, last_login, is_superuser, is_active, is_staff, role_name) FROM stdin;
	\N	f	t	f	AdministradorLaboratorio
	\N	f	t	f	AsistenteLaboratorio
\.


--
-- Data for Name: core_role_groups; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_role_groups (id, role_id, group_id) FROM stdin;
\.


--
-- Data for Name: core_role_user_permissions; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_role_user_permissions (id, role_id, permission_id) FROM stdin;
\.


--
-- Data for Name: core_session; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_session (id, login_time, logout_time, user_id) FROM stdin;
\.


--
-- Data for Name: core_user; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_user (id, password, last_login, is_superuser, email, name, is_active, is_staff, role_id) FROM stdin;
1	pbkdf2_sha256$260000$1HGI3wIyWsqHAcrVCyoMvr$9u5Z/PemID+zhJ2ZjXu1SAyt444NpGKYuAjDJlY368U=	\N	t	admin@example.com		t	t	\N
\.


--
-- Data for Name: core_user_groups; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: core_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	password_history	passwordhistory
7	password_history	userpasswordhistoryconfig
8	core	user
9	core	role
10	core	labadmin
11	core	labassistant
12	core	session
13	authtoken	token
14	authtoken	tokenproxy
15	item	brand
16	item	category
17	item	item
18	loan	prestamo
19	loan	prestamoitem
20	academico	asignatura
21	academico	asignaturaestudiante
22	academico	asistencia
23	academico	estadoasistencia
24	academico	estadotarea
25	academico	estudiante
26	academico	grado
27	academico	periodo
28	academico	tarea
29	academico	licencia
30	academico	asignaturaperiodo
31	academico	tareaestudiante
32	foro	foro
33	foro	mensaje
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-09-02 20:18:52.809485+00
2	contenttypes	0002_remove_content_type_name	2024-09-02 20:18:52.819292+00
3	auth	0001_initial	2024-09-02 20:18:52.87484+00
4	auth	0002_alter_permission_name_max_length	2024-09-02 20:18:52.880873+00
5	auth	0003_alter_user_email_max_length	2024-09-02 20:18:52.887105+00
6	auth	0004_alter_user_username_opts	2024-09-02 20:18:52.893015+00
7	auth	0005_alter_user_last_login_null	2024-09-02 20:18:52.899957+00
8	auth	0006_require_contenttypes_0002	2024-09-02 20:18:52.902856+00
9	auth	0007_alter_validators_add_error_messages	2024-09-02 20:18:52.908828+00
10	auth	0008_alter_user_username_max_length	2024-09-02 20:18:52.916511+00
11	auth	0009_alter_user_last_name_max_length	2024-09-02 20:18:52.923192+00
12	auth	0010_alter_group_name_max_length	2024-09-02 20:18:52.932449+00
13	auth	0011_update_proxy_permissions	2024-09-02 20:18:52.94019+00
14	auth	0012_alter_user_first_name_max_length	2024-09-02 20:18:52.947759+00
15	core	0001_initial	2024-09-02 20:18:53.007388+00
16	admin	0001_initial	2024-09-02 20:18:53.03274+00
17	admin	0002_logentry_remove_auto_add	2024-09-02 20:18:53.042622+00
18	admin	0003_logentry_add_action_flag_choices	2024-09-02 20:18:53.052034+00
19	authtoken	0001_initial	2024-09-02 20:18:53.076209+00
20	authtoken	0002_auto_20160226_1747	2024-09-02 20:18:53.097658+00
21	authtoken	0003_tokenproxy	2024-09-02 20:18:53.102717+00
22	core	0002_recipe	2024-09-02 20:18:53.125835+00
23	core	0003_auto_20240507_1919	2024-09-02 20:18:53.212232+00
24	core	0004_auto_20240508_0132	2024-09-02 20:18:53.229297+00
25	core	0005_session	2024-09-02 20:18:53.251973+00
26	core	0006_delete_recipe	2024-09-02 20:18:53.258432+00
27	item	0001_initial	2024-09-02 20:18:53.321573+00
28	item	0002_item_image	2024-09-02 20:18:53.328251+00
29	item	0003_auto_20240527_2237	2024-09-02 20:18:53.346651+00
30	item	0004_auto_20240527_2354	2024-09-02 20:18:53.371554+00
31	item	0005_item_quantity_on_loan	2024-09-02 20:18:53.379799+00
32	loan	0001_initial	2024-09-02 20:18:53.43115+00
33	loan	0002_auto_20240529_0042	2024-09-02 20:18:53.476149+00
34	password_history	0001_initial	2024-09-02 20:18:53.554896+00
35	password_history	0002_auto_20180424_1422	2024-09-02 20:18:53.564015+00
36	password_history	0003_auto_20201206_1357	2024-09-02 20:18:53.577225+00
37	sessions	0001_initial	2024-09-02 20:18:53.599045+00
38	academico	0001_initial	2024-09-16 03:14:25.894416+00
39	academico	0002_auto_20240908_1744	2024-09-16 03:14:26.063137+00
40	foro	0001_initial	2024-09-16 03:14:26.177815+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: foro_foro; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.foro_foro (id, nombre, fecha_creacion, usuario_id) FROM stdin;
\.


--
-- Data for Name: foro_mensaje; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.foro_mensaje (id, fecha_hora, texto, foro_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: item_brand; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.item_brand (id, marca) FROM stdin;
\.


--
-- Data for Name: item_category; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.item_category (id, nombre, description) FROM stdin;
\.


--
-- Data for Name: item_item; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.item_item (id, nombre, description, link, serial_number, quantity, image, marca_id, quantity_on_loan) FROM stdin;
\.


--
-- Data for Name: item_item_categories; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.item_item_categories (id, item_id, category_id) FROM stdin;
\.


--
-- Data for Name: loan_prestamo; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.loan_prestamo (id, fecha_prestamo, fecha_devolucion, devuelto, usuario_id) FROM stdin;
\.


--
-- Data for Name: loan_prestamoitem; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.loan_prestamoitem (id, cantidad, item_id, prestamo_id) FROM stdin;
\.


--
-- Data for Name: password_history_passwordhistory; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.password_history_passwordhistory (id, password, date, user_config_id) FROM stdin;
\.


--
-- Data for Name: password_history_userpasswordhistoryconfig; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.password_history_userpasswordhistoryconfig (id, date, salt, iterations, user_id) FROM stdin;
\.


--
-- Name: academico_asignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_asignatura_id_seq', 1, false);


--
-- Name: academico_asignaturaestudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_asignaturaestudiante_id_seq', 1, false);


--
-- Name: academico_asignaturaperiodo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_asignaturaperiodo_id_seq', 1, false);


--
-- Name: academico_asistencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_asistencia_id_seq', 1, false);


--
-- Name: academico_estadoasistencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_estadoasistencia_id_seq', 1, false);


--
-- Name: academico_estadotarea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_estadotarea_id_seq', 1, false);


--
-- Name: academico_estudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_estudiante_id_seq', 1, false);


--
-- Name: academico_grado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_grado_id_seq', 1, false);


--
-- Name: academico_licencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_licencia_id_seq', 1, false);


--
-- Name: academico_periodo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_periodo_id_seq', 1, false);


--
-- Name: academico_tarea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_tarea_id_seq', 1, false);


--
-- Name: academico_tareaestudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.academico_tareaestudiante_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 139, true);


--
-- Name: core_role_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_role_groups_id_seq', 1, false);


--
-- Name: core_role_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_role_user_permissions_id_seq', 1, false);


--
-- Name: core_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_session_id_seq', 1, false);


--
-- Name: core_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_user_groups_id_seq', 1, false);


--
-- Name: core_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_user_id_seq', 1, true);


--
-- Name: core_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 33, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 40, true);


--
-- Name: foro_foro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.foro_foro_id_seq', 1, false);


--
-- Name: foro_mensaje_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.foro_mensaje_id_seq', 1, false);


--
-- Name: item_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.item_brand_id_seq', 1, false);


--
-- Name: item_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.item_category_id_seq', 1, false);


--
-- Name: item_item_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.item_item_categories_id_seq', 1, false);


--
-- Name: item_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.item_item_id_seq', 1, false);


--
-- Name: loan_prestamo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.loan_prestamo_id_seq', 1, false);


--
-- Name: loan_prestamoitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.loan_prestamoitem_id_seq', 1, false);


--
-- Name: password_history_passwordhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.password_history_passwordhistory_id_seq', 1, false);


--
-- Name: password_history_userpasswordhistoryconfig_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.password_history_userpasswordhistoryconfig_id_seq', 1, false);


--
-- Name: academico_asignatura academico_asignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignatura
    ADD CONSTRAINT academico_asignatura_pkey PRIMARY KEY (id);


--
-- Name: academico_asignaturaestudiante academico_asignaturaestudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaestudiante
    ADD CONSTRAINT academico_asignaturaestudiante_pkey PRIMARY KEY (id);


--
-- Name: academico_asignaturaperiodo academico_asignaturaperiodo_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaperiodo
    ADD CONSTRAINT academico_asignaturaperiodo_pkey PRIMARY KEY (id);


--
-- Name: academico_asistencia academico_asistencia_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asistencia
    ADD CONSTRAINT academico_asistencia_pkey PRIMARY KEY (id);


--
-- Name: academico_estadoasistencia academico_estadoasistencia_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_estadoasistencia
    ADD CONSTRAINT academico_estadoasistencia_pkey PRIMARY KEY (id);


--
-- Name: academico_estadotarea academico_estadotarea_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_estadotarea
    ADD CONSTRAINT academico_estadotarea_pkey PRIMARY KEY (id);


--
-- Name: academico_estudiante academico_estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_estudiante
    ADD CONSTRAINT academico_estudiante_pkey PRIMARY KEY (id);


--
-- Name: academico_grado academico_grado_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_grado
    ADD CONSTRAINT academico_grado_pkey PRIMARY KEY (id);


--
-- Name: academico_licencia academico_licencia_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_licencia
    ADD CONSTRAINT academico_licencia_pkey PRIMARY KEY (id);


--
-- Name: academico_periodo academico_periodo_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_periodo
    ADD CONSTRAINT academico_periodo_pkey PRIMARY KEY (id);


--
-- Name: academico_tarea academico_tarea_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tarea
    ADD CONSTRAINT academico_tarea_pkey PRIMARY KEY (id);


--
-- Name: academico_tareaestudiante academico_tareaestudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tareaestudiante
    ADD CONSTRAINT academico_tareaestudiante_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: core_role_groups core_role_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_groups
    ADD CONSTRAINT core_role_groups_pkey PRIMARY KEY (id);


--
-- Name: core_role_groups core_role_groups_role_id_group_id_70aa0f7e_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_groups
    ADD CONSTRAINT core_role_groups_role_id_group_id_70aa0f7e_uniq UNIQUE (role_id, group_id);


--
-- Name: core_role core_role_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role
    ADD CONSTRAINT core_role_pkey PRIMARY KEY (role_name);


--
-- Name: core_role_user_permissions core_role_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_user_permissions
    ADD CONSTRAINT core_role_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: core_role_user_permissions core_role_user_permissions_role_id_permission_id_e9fd1a3e_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_user_permissions
    ADD CONSTRAINT core_role_user_permissions_role_id_permission_id_e9fd1a3e_uniq UNIQUE (role_id, permission_id);


--
-- Name: core_session core_session_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_session
    ADD CONSTRAINT core_session_pkey PRIMARY KEY (id);


--
-- Name: core_user core_user_email_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user
    ADD CONSTRAINT core_user_email_key UNIQUE (email);


--
-- Name: core_user_groups core_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_pkey PRIMARY KEY (id);


--
-- Name: core_user_groups core_user_groups_user_id_group_id_c82fcad1_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_user_id_group_id_c82fcad1_uniq UNIQUE (user_id, group_id);


--
-- Name: core_user core_user_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user
    ADD CONSTRAINT core_user_pkey PRIMARY KEY (id);


--
-- Name: core_user_user_permissions core_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: core_user_user_permissions core_user_user_permissions_user_id_permission_id_73ea0daa_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permissions_user_id_permission_id_73ea0daa_uniq UNIQUE (user_id, permission_id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: foro_foro foro_foro_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.foro_foro
    ADD CONSTRAINT foro_foro_pkey PRIMARY KEY (id);


--
-- Name: foro_mensaje foro_mensaje_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.foro_mensaje
    ADD CONSTRAINT foro_mensaje_pkey PRIMARY KEY (id);


--
-- Name: item_brand item_brand_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_brand
    ADD CONSTRAINT item_brand_pkey PRIMARY KEY (id);


--
-- Name: item_category item_category_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_category
    ADD CONSTRAINT item_category_pkey PRIMARY KEY (id);


--
-- Name: item_item_categories item_item_categories_item_id_category_id_1b3693d9_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item_categories
    ADD CONSTRAINT item_item_categories_item_id_category_id_1b3693d9_uniq UNIQUE (item_id, category_id);


--
-- Name: item_item_categories item_item_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item_categories
    ADD CONSTRAINT item_item_categories_pkey PRIMARY KEY (id);


--
-- Name: item_item item_item_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item
    ADD CONSTRAINT item_item_pkey PRIMARY KEY (id);


--
-- Name: loan_prestamo loan_prestamo_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.loan_prestamo
    ADD CONSTRAINT loan_prestamo_pkey PRIMARY KEY (id);


--
-- Name: loan_prestamoitem loan_prestamoitem_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.loan_prestamoitem
    ADD CONSTRAINT loan_prestamoitem_pkey PRIMARY KEY (id);


--
-- Name: password_history_passwordhistory password_history_passwor_user_config_id_password_788e1175_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_passwordhistory
    ADD CONSTRAINT password_history_passwor_user_config_id_password_788e1175_uniq UNIQUE (user_config_id, password);


--
-- Name: password_history_passwordhistory password_history_passwordhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_passwordhistory
    ADD CONSTRAINT password_history_passwordhistory_pkey PRIMARY KEY (id);


--
-- Name: password_history_userpasswordhistoryconfig password_history_userpas_user_id_iterations_fa725dcb_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_userpasswordhistoryconfig
    ADD CONSTRAINT password_history_userpas_user_id_iterations_fa725dcb_uniq UNIQUE (user_id, iterations);


--
-- Name: password_history_userpasswordhistoryconfig password_history_userpasswordhistoryconfig_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_userpasswordhistoryconfig
    ADD CONSTRAINT password_history_userpasswordhistoryconfig_pkey PRIMARY KEY (id);


--
-- Name: academico_asignatura_grado_id_2e989e54; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_asignatura_grado_id_2e989e54 ON public.academico_asignatura USING btree (grado_id);


--
-- Name: academico_asignaturaestudiante_asignatura_periodo_id_93a542d5; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_asignaturaestudiante_asignatura_periodo_id_93a542d5 ON public.academico_asignaturaestudiante USING btree (asignatura_periodo_id);


--
-- Name: academico_asignaturaestudiante_estudiante_id_248ed339; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_asignaturaestudiante_estudiante_id_248ed339 ON public.academico_asignaturaestudiante USING btree (estudiante_id);


--
-- Name: academico_asignaturaperiodo_asignatura_id_71a4c14a; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_asignaturaperiodo_asignatura_id_71a4c14a ON public.academico_asignaturaperiodo USING btree (asignatura_id);


--
-- Name: academico_asignaturaperiodo_periodo_id_f4ce67c5; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_asignaturaperiodo_periodo_id_f4ce67c5 ON public.academico_asignaturaperiodo USING btree (periodo_id);


--
-- Name: academico_asignaturaperiodo_usuario_id_0a69417b; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_asignaturaperiodo_usuario_id_0a69417b ON public.academico_asignaturaperiodo USING btree (usuario_id);


--
-- Name: academico_asistencia_asignatura_estudiante_id_3aca70e1; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_asistencia_asignatura_estudiante_id_3aca70e1 ON public.academico_asistencia USING btree (asignatura_estudiante_id);


--
-- Name: academico_licencia_asistencia_id_0fbe8c1b; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_licencia_asistencia_id_0fbe8c1b ON public.academico_licencia USING btree (asistencia_id);


--
-- Name: academico_licencia_usuario_id_183271f7; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_licencia_usuario_id_183271f7 ON public.academico_licencia USING btree (usuario_id);


--
-- Name: academico_tarea_asignatura_id_aca4323b; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_tarea_asignatura_id_aca4323b ON public.academico_tarea USING btree (asignatura_id);


--
-- Name: academico_tareaestudiante_estado_tarea_id_189de20b; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_tareaestudiante_estado_tarea_id_189de20b ON public.academico_tareaestudiante USING btree (estado_tarea_id);


--
-- Name: academico_tareaestudiante_estudiante_id_68e04afb; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_tareaestudiante_estudiante_id_68e04afb ON public.academico_tareaestudiante USING btree (estudiante_id);


--
-- Name: academico_tareaestudiante_tarea_id_4826def1; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX academico_tareaestudiante_tarea_id_4826def1 ON public.academico_tareaestudiante USING btree (tarea_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: core_role_groups_group_id_10648740; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_role_groups_group_id_10648740 ON public.core_role_groups USING btree (group_id);


--
-- Name: core_role_groups_role_id_8bcbbf58; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_role_groups_role_id_8bcbbf58 ON public.core_role_groups USING btree (role_id);


--
-- Name: core_role_groups_role_id_8bcbbf58_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_role_groups_role_id_8bcbbf58_like ON public.core_role_groups USING btree (role_id varchar_pattern_ops);


--
-- Name: core_role_role_name_2e7293d3_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_role_role_name_2e7293d3_like ON public.core_role USING btree (role_name varchar_pattern_ops);


--
-- Name: core_role_user_permissions_permission_id_a8bb5c06; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_role_user_permissions_permission_id_a8bb5c06 ON public.core_role_user_permissions USING btree (permission_id);


--
-- Name: core_role_user_permissions_role_id_f2715ca8; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_role_user_permissions_role_id_f2715ca8 ON public.core_role_user_permissions USING btree (role_id);


--
-- Name: core_role_user_permissions_role_id_f2715ca8_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_role_user_permissions_role_id_f2715ca8_like ON public.core_role_user_permissions USING btree (role_id varchar_pattern_ops);


--
-- Name: core_session_user_id_494e6742; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_session_user_id_494e6742 ON public.core_session USING btree (user_id);


--
-- Name: core_user_email_92a71487_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_user_email_92a71487_like ON public.core_user USING btree (email varchar_pattern_ops);


--
-- Name: core_user_groups_group_id_fe8c697f; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_user_groups_group_id_fe8c697f ON public.core_user_groups USING btree (group_id);


--
-- Name: core_user_groups_user_id_70b4d9b8; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_user_groups_user_id_70b4d9b8 ON public.core_user_groups USING btree (user_id);


--
-- Name: core_user_role_id_8de62872; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_user_role_id_8de62872 ON public.core_user USING btree (role_id);


--
-- Name: core_user_role_id_8de62872_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_user_role_id_8de62872_like ON public.core_user USING btree (role_id varchar_pattern_ops);


--
-- Name: core_user_user_permissions_permission_id_35ccf601; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_user_user_permissions_permission_id_35ccf601 ON public.core_user_user_permissions USING btree (permission_id);


--
-- Name: core_user_user_permissions_user_id_085123d3; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_user_user_permissions_user_id_085123d3 ON public.core_user_user_permissions USING btree (user_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: foro_foro_usuario_id_825d32d0; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX foro_foro_usuario_id_825d32d0 ON public.foro_foro USING btree (usuario_id);


--
-- Name: foro_mensaje_foro_id_95fc0f85; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX foro_mensaje_foro_id_95fc0f85 ON public.foro_mensaje USING btree (foro_id);


--
-- Name: foro_mensaje_usuario_id_25e22ebc; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX foro_mensaje_usuario_id_25e22ebc ON public.foro_mensaje USING btree (usuario_id);


--
-- Name: item_item_categories_category_id_7ff803d3; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX item_item_categories_category_id_7ff803d3 ON public.item_item_categories USING btree (category_id);


--
-- Name: item_item_categories_item_id_1c4be5c4; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX item_item_categories_item_id_1c4be5c4 ON public.item_item_categories USING btree (item_id);


--
-- Name: item_item_marca_id_9b422d66; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX item_item_marca_id_9b422d66 ON public.item_item USING btree (marca_id);


--
-- Name: loan_prestamo_usuario_id_249624ac; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX loan_prestamo_usuario_id_249624ac ON public.loan_prestamo USING btree (usuario_id);


--
-- Name: loan_prestamoitem_item_id_1383ba67; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX loan_prestamoitem_item_id_1383ba67 ON public.loan_prestamoitem USING btree (item_id);


--
-- Name: loan_prestamoitem_prestamo_id_45f8a98e; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX loan_prestamoitem_prestamo_id_45f8a98e ON public.loan_prestamoitem USING btree (prestamo_id);


--
-- Name: password_history_passwordhistory_user_config_id_20af20ac; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX password_history_passwordhistory_user_config_id_20af20ac ON public.password_history_passwordhistory USING btree (user_config_id);


--
-- Name: password_history_userpasswordhistoryconfig_user_id_bc5676f2; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX password_history_userpasswordhistoryconfig_user_id_bc5676f2 ON public.password_history_userpasswordhistoryconfig USING btree (user_id);


--
-- Name: academico_asignaturaperiodo academico_asignatura_asignatura_id_71a4c14a_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaperiodo
    ADD CONSTRAINT academico_asignatura_asignatura_id_71a4c14a_fk_academico FOREIGN KEY (asignatura_id) REFERENCES public.academico_asignatura(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_asignaturaestudiante academico_asignatura_asignatura_periodo_i_93a542d5_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaestudiante
    ADD CONSTRAINT academico_asignatura_asignatura_periodo_i_93a542d5_fk_academico FOREIGN KEY (asignatura_periodo_id) REFERENCES public.academico_asignaturaperiodo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_asignaturaestudiante academico_asignatura_estudiante_id_248ed339_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaestudiante
    ADD CONSTRAINT academico_asignatura_estudiante_id_248ed339_fk_academico FOREIGN KEY (estudiante_id) REFERENCES public.academico_estudiante(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_asignatura academico_asignatura_grado_id_2e989e54_fk_academico_grado_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignatura
    ADD CONSTRAINT academico_asignatura_grado_id_2e989e54_fk_academico_grado_id FOREIGN KEY (grado_id) REFERENCES public.academico_grado(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_asignaturaperiodo academico_asignatura_periodo_id_f4ce67c5_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaperiodo
    ADD CONSTRAINT academico_asignatura_periodo_id_f4ce67c5_fk_academico FOREIGN KEY (periodo_id) REFERENCES public.academico_periodo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_asignaturaperiodo academico_asignaturaperiodo_usuario_id_0a69417b_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asignaturaperiodo
    ADD CONSTRAINT academico_asignaturaperiodo_usuario_id_0a69417b_fk_core_user_id FOREIGN KEY (usuario_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_asistencia academico_asistencia_asignatura_estudiant_3aca70e1_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_asistencia
    ADD CONSTRAINT academico_asistencia_asignatura_estudiant_3aca70e1_fk_academico FOREIGN KEY (asignatura_estudiante_id) REFERENCES public.academico_asignaturaestudiante(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_licencia academico_licencia_asistencia_id_0fbe8c1b_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_licencia
    ADD CONSTRAINT academico_licencia_asistencia_id_0fbe8c1b_fk_academico FOREIGN KEY (asistencia_id) REFERENCES public.academico_asistencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_licencia academico_licencia_usuario_id_183271f7_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_licencia
    ADD CONSTRAINT academico_licencia_usuario_id_183271f7_fk_core_user_id FOREIGN KEY (usuario_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_tarea academico_tarea_asignatura_id_aca4323b_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tarea
    ADD CONSTRAINT academico_tarea_asignatura_id_aca4323b_fk_academico FOREIGN KEY (asignatura_id) REFERENCES public.academico_asignaturaperiodo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_tareaestudiante academico_tareaestud_estado_tarea_id_189de20b_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tareaestudiante
    ADD CONSTRAINT academico_tareaestud_estado_tarea_id_189de20b_fk_academico FOREIGN KEY (estado_tarea_id) REFERENCES public.academico_estadotarea(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_tareaestudiante academico_tareaestud_estudiante_id_68e04afb_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tareaestudiante
    ADD CONSTRAINT academico_tareaestud_estudiante_id_68e04afb_fk_academico FOREIGN KEY (estudiante_id) REFERENCES public.academico_asignaturaestudiante(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: academico_tareaestudiante academico_tareaestud_tarea_id_4826def1_fk_academico; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.academico_tareaestudiante
    ADD CONSTRAINT academico_tareaestud_tarea_id_4826def1_fk_academico FOREIGN KEY (tarea_id) REFERENCES public.academico_tarea(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_role_groups core_role_groups_group_id_10648740_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_groups
    ADD CONSTRAINT core_role_groups_group_id_10648740_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_role_groups core_role_groups_role_id_8bcbbf58_fk_core_role_role_name; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_groups
    ADD CONSTRAINT core_role_groups_role_id_8bcbbf58_fk_core_role_role_name FOREIGN KEY (role_id) REFERENCES public.core_role(role_name) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_role_user_permissions core_role_user_permi_permission_id_a8bb5c06_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_user_permissions
    ADD CONSTRAINT core_role_user_permi_permission_id_a8bb5c06_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_role_user_permissions core_role_user_permi_role_id_f2715ca8_fk_core_role; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_role_user_permissions
    ADD CONSTRAINT core_role_user_permi_role_id_f2715ca8_fk_core_role FOREIGN KEY (role_id) REFERENCES public.core_role(role_name) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_session core_session_user_id_494e6742_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_session
    ADD CONSTRAINT core_session_user_id_494e6742_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_groups core_user_groups_group_id_fe8c697f_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_group_id_fe8c697f_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_groups core_user_groups_user_id_70b4d9b8_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_user_id_70b4d9b8_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user core_user_role_id_8de62872_fk_core_role_role_name; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user
    ADD CONSTRAINT core_user_role_id_8de62872_fk_core_role_role_name FOREIGN KEY (role_id) REFERENCES public.core_role(role_name) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_permissions core_user_user_permi_permission_id_35ccf601_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permi_permission_id_35ccf601_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_permissions core_user_user_permissions_user_id_085123d3_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permissions_user_id_085123d3_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: foro_foro foro_foro_usuario_id_825d32d0_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.foro_foro
    ADD CONSTRAINT foro_foro_usuario_id_825d32d0_fk_core_user_id FOREIGN KEY (usuario_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: foro_mensaje foro_mensaje_foro_id_95fc0f85_fk_foro_foro_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.foro_mensaje
    ADD CONSTRAINT foro_mensaje_foro_id_95fc0f85_fk_foro_foro_id FOREIGN KEY (foro_id) REFERENCES public.foro_foro(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: foro_mensaje foro_mensaje_usuario_id_25e22ebc_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.foro_mensaje
    ADD CONSTRAINT foro_mensaje_usuario_id_25e22ebc_fk_core_user_id FOREIGN KEY (usuario_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: item_item_categories item_item_categories_category_id_7ff803d3_fk_item_category_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item_categories
    ADD CONSTRAINT item_item_categories_category_id_7ff803d3_fk_item_category_id FOREIGN KEY (category_id) REFERENCES public.item_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: item_item_categories item_item_categories_item_id_1c4be5c4_fk_item_item_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item_categories
    ADD CONSTRAINT item_item_categories_item_id_1c4be5c4_fk_item_item_id FOREIGN KEY (item_id) REFERENCES public.item_item(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: item_item item_item_marca_id_9b422d66_fk_item_brand_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.item_item
    ADD CONSTRAINT item_item_marca_id_9b422d66_fk_item_brand_id FOREIGN KEY (marca_id) REFERENCES public.item_brand(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: loan_prestamo loan_prestamo_usuario_id_249624ac_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.loan_prestamo
    ADD CONSTRAINT loan_prestamo_usuario_id_249624ac_fk_core_user_id FOREIGN KEY (usuario_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: loan_prestamoitem loan_prestamoitem_item_id_1383ba67_fk_item_item_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.loan_prestamoitem
    ADD CONSTRAINT loan_prestamoitem_item_id_1383ba67_fk_item_item_id FOREIGN KEY (item_id) REFERENCES public.item_item(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: loan_prestamoitem loan_prestamoitem_prestamo_id_45f8a98e_fk_loan_prestamo_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.loan_prestamoitem
    ADD CONSTRAINT loan_prestamoitem_prestamo_id_45f8a98e_fk_loan_prestamo_id FOREIGN KEY (prestamo_id) REFERENCES public.loan_prestamo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: password_history_passwordhistory password_history_pas_user_config_id_20af20ac_fk_password_; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_passwordhistory
    ADD CONSTRAINT password_history_pas_user_config_id_20af20ac_fk_password_ FOREIGN KEY (user_config_id) REFERENCES public.password_history_userpasswordhistoryconfig(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: password_history_userpasswordhistoryconfig password_history_use_user_id_bc5676f2_fk_core_user; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.password_history_userpasswordhistoryconfig
    ADD CONSTRAINT password_history_use_user_id_bc5676f2_fk_core_user FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

