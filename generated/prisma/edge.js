
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  role: 'role',
  isActive: 'isActive',
  avatarUrl: 'avatarUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  clientName: 'clientName',
  clientEmail: 'clientEmail',
  clientPhone: 'clientPhone',
  eventType: 'eventType',
  eventDate: 'eventDate',
  location: 'location',
  guestCount: 'guestCount',
  budgetRange: 'budgetRange',
  notes: 'notes',
  status: 'status',
  internalNotes: 'internalNotes',
  assignedTo: 'assignedTo',
  agreedAmount: 'agreedAmount',
  depositAmount: 'depositAmount',
  depositPaid: 'depositPaid',
  depositDate: 'depositDate',
  balancePaid: 'balancePaid',
  balanceDate: 'balanceDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  sender: 'sender',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.GalleryImageScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  imageUrl: 'imageUrl',
  category: 'category',
  isFeatured: 'isFeatured',
  isBeforeAfter: 'isBeforeAfter',
  beforeImageUrl: 'beforeImageUrl',
  afterImageUrl: 'afterImageUrl',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.PackageCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  coverImage: 'coverImage',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PackageScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  name: 'name',
  shortDesc: 'shortDesc',
  description: 'description',
  price: 'price',
  priceLabel: 'priceLabel',
  features: 'features',
  exclusions: 'exclusions',
  imageUrl: 'imageUrl',
  galleryImages: 'galleryImages',
  isPopular: 'isPopular',
  isFeatured: 'isFeatured',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WeddingInvitationScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  brideName: 'brideName',
  groomName: 'groomName',
  slug: 'slug',
  weddingDate: 'weddingDate',
  weddingTime: 'weddingTime',
  venueName: 'venueName',
  venueAddress: 'venueAddress',
  dressCode: 'dressCode',
  mapUrl: 'mapUrl',
  welcomeMessage: 'welcomeMessage',
  story: 'story',
  heroImageUrl: 'heroImageUrl',
  coverImage: 'coverImage',
  galleryImages: 'galleryImages',
  templateKey: 'templateKey',
  theme: 'theme',
  themeColor: 'themeColor',
  primaryColor: 'primaryColor',
  secondaryColor: 'secondaryColor',
  customMessage: 'customMessage',
  floralTopLeft: 'floralTopLeft',
  floralTopRight: 'floralTopRight',
  floralBottomLeft: 'floralBottomLeft',
  floralBottomRight: 'floralBottomRight',
  status: 'status',
  allowRSVP: 'allowRSVP',
  allowGiftRegistry: 'allowGiftRegistry',
  publishedAt: 'publishedAt',
  isPublished: 'isPublished',
  pdfUrl: 'pdfUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InvitationMessageScalarFieldEnum = {
  id: 'id',
  weddingId: 'weddingId',
  preline: 'preline',
  message: 'message',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LoveStoryScalarFieldEnum = {
  id: 'id',
  weddingId: 'weddingId',
  year: 'year',
  title: 'title',
  description: 'description',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProgramItemScalarFieldEnum = {
  id: 'id',
  weddingId: 'weddingId',
  time: 'time',
  title: 'title',
  description: 'description',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VenueDetailScalarFieldEnum = {
  id: 'id',
  weddingId: 'weddingId',
  name: 'name',
  address: 'address',
  googleMapsLink: 'googleMapsLink',
  eventTime: 'eventTime',
  dressCode: 'dressCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RSVPScalarFieldEnum = {
  id: 'id',
  invitationId: 'invitationId',
  guestName: 'guestName',
  guestPhone: 'guestPhone',
  attendance: 'attendance',
  message: 'message',
  createdAt: 'createdAt'
};

exports.Prisma.GiftRegistryScalarFieldEnum = {
  id: 'id',
  invitationId: 'invitationId',
  giftName: 'giftName',
  title: 'title',
  description: 'description',
  imageUrl: 'imageUrl',
  priority: 'priority',
  priorityLabel: 'priorityLabel',
  allowDuplicates: 'allowDuplicates',
  isReserved: 'isReserved',
  reservedBy: 'reservedBy',
  reservedMessage: 'reservedMessage',
  createdAt: 'createdAt'
};

exports.Prisma.GiftReservationScalarFieldEnum = {
  id: 'id',
  invitationId: 'invitationId',
  giftId: 'giftId',
  reservedBy: 'reservedBy',
  reservedMessage: 'reservedMessage',
  createdAt: 'createdAt'
};

exports.Prisma.DesignAssetScalarFieldEnum = {
  id: 'id',
  name: 'name',
  imageUrl: 'imageUrl',
  category: 'category',
  createdAt: 'createdAt'
};

exports.Prisma.ProposalScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  title: 'title',
  proposalNumber: 'proposalNumber',
  introduction: 'introduction',
  eventVision: 'eventVision',
  themeConcept: 'themeConcept',
  totalAmount: 'totalAmount',
  currency: 'currency',
  status: 'status',
  validUntil: 'validUntil',
  pdfUrl: 'pdfUrl',
  publicToken: 'publicToken',
  clientApproved: 'clientApproved',
  clientApprovedAt: 'clientApprovedAt',
  clientRejected: 'clientRejected',
  rejectionReason: 'rejectionReason',
  notes: 'notes',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProposalItemScalarFieldEnum = {
  id: 'id',
  proposalId: 'proposalId',
  title: 'title',
  description: 'description',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  totalPrice: 'totalPrice',
  category: 'category',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.ProposalSectionScalarFieldEnum = {
  id: 'id',
  proposalId: 'proposalId',
  title: 'title',
  content: 'content',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.ProposalContractScalarFieldEnum = {
  id: 'id',
  proposalId: 'proposalId',
  title: 'title',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.ProposalCommentScalarFieldEnum = {
  id: 'id',
  proposalId: 'proposalId',
  authorName: 'authorName',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.ProposalTemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  eventType: 'eventType',
  coverImage: 'coverImage',
  sections: 'sections',
  contractTerms: 'contractTerms',
  isActive: 'isActive',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
};

exports.EventType = exports.$Enums.EventType = {
  WEDDING: 'WEDDING',
  BIRTHDAY: 'BIRTHDAY',
  CORPORATE: 'CORPORATE',
  GRADUATION: 'GRADUATION',
  ENGAGEMENT: 'ENGAGEMENT',
  ANNIVERSARY: 'ANNIVERSARY',
  CULTURAL: 'CULTURAL',
  OTHER: 'OTHER'
};

exports.BudgetRange = exports.$Enums.BudgetRange = {
  UNDER_50K: 'UNDER_50K',
  RANGE_50K_100K: 'RANGE_50K_100K',
  RANGE_100K_200K: 'RANGE_100K_200K',
  RANGE_200K_500K: 'RANGE_200K_500K',
  ABOVE_500K: 'ABOVE_500K'
};

exports.BookingStatus = exports.$Enums.BookingStatus = {
  NEW_REQUEST: 'NEW_REQUEST',
  CONTACTED: 'CONTACTED',
  CONFIRMED: 'CONFIRMED',
  PLANNED: 'PLANNED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.MessageSender = exports.$Enums.MessageSender = {
  ADMIN: 'ADMIN',
  SYSTEM: 'SYSTEM'
};

exports.GalleryCategory = exports.$Enums.GalleryCategory = {
  WEDDINGS: 'WEDDINGS',
  BIRTHDAYS: 'BIRTHDAYS',
  CORPORATE: 'CORPORATE',
  DECORATIONS: 'DECORATIONS',
  BEHIND_THE_SCENES: 'BEHIND_THE_SCENES'
};

exports.InvitationTheme = exports.$Enums.InvitationTheme = {
  FLORAL_LUXURY: 'FLORAL_LUXURY',
  MODERN_MINIMAL: 'MODERN_MINIMAL',
  ROYAL_GOLD: 'ROYAL_GOLD',
  TRADITIONAL_ETHIOPIAN: 'TRADITIONAL_ETHIOPIAN',
  ELEGANT_BLACK: 'ELEGANT_BLACK',
  GARDEN_WEDDING: 'GARDEN_WEDDING',
  LUXURY_WHITE: 'LUXURY_WHITE',
  CLASSIC_SERIF: 'CLASSIC_SERIF'
};

exports.InvitationStatus = exports.$Enums.InvitationStatus = {
  DRAFT: 'DRAFT',
  REVIEW: 'REVIEW',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.RSVPStatus = exports.$Enums.RSVPStatus = {
  ATTENDING: 'ATTENDING',
  NOT_ATTENDING: 'NOT_ATTENDING',
  MAYBE: 'MAYBE',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED'
};

exports.GiftPriority = exports.$Enums.GiftPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

exports.AssetCategory = exports.$Enums.AssetCategory = {
  FLORAL: 'FLORAL',
  FRAME: 'FRAME',
  ORNAMENT: 'ORNAMENT',
  TEXTURE: 'TEXTURE'
};

exports.ProposalStatus = exports.$Enums.ProposalStatus = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  VIEWED: 'VIEWED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED'
};

exports.ProposalItemCategory = exports.$Enums.ProposalItemCategory = {
  DECORATION: 'DECORATION',
  CATERING: 'CATERING',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  VENUE: 'VENUE',
  ENTERTAINMENT: 'ENTERTAINMENT',
  FLORAL: 'FLORAL',
  LIGHTING: 'LIGHTING',
  TRANSPORT: 'TRANSPORT',
  COORDINATION: 'COORDINATION',
  CUSTOM: 'CUSTOM'
};

exports.Prisma.ModelName = {
  User: 'User',
  Booking: 'Booking',
  Message: 'Message',
  GalleryImage: 'GalleryImage',
  PackageCategory: 'PackageCategory',
  Package: 'Package',
  WeddingInvitation: 'WeddingInvitation',
  InvitationMessage: 'InvitationMessage',
  LoveStory: 'LoveStory',
  ProgramItem: 'ProgramItem',
  VenueDetail: 'VenueDetail',
  RSVP: 'RSVP',
  GiftRegistry: 'GiftRegistry',
  GiftReservation: 'GiftReservation',
  DesignAsset: 'DesignAsset',
  Proposal: 'Proposal',
  ProposalItem: 'ProposalItem',
  ProposalSection: 'ProposalSection',
  ProposalContract: 'ProposalContract',
  ProposalComment: 'ProposalComment',
  ProposalTemplate: 'ProposalTemplate'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\LEGION\\Documents\\My Project\\Radiance\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\LEGION\\Documents\\My Project\\Radiance\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// Starter models — replace with your own\n// ─────────────────────────────────────────\n// ADMIN USER\n// ─────────────────────────────────────────\nenum UserRole {\n  SUPER_ADMIN\n  ADMIN\n  STAFF\n}\n\nmodel User {\n  id        String   @id @default(cuid())\n  name      String\n  email     String   @unique\n  password  String // bcrypt hashed\n  role      UserRole @default(STAFF)\n  isActive  Boolean  @default(true)\n  avatarUrl String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now()) @updatedAt\n\n  proposals         Proposal[]\n  proposalTemplates ProposalTemplate[]\n}\n\n// ─────────────────────────────────────────\n// BOOKINGS\n// ─────────────────────────────────────────\nmodel Booking {\n  id String @id @default(cuid())\n\n  // Client info\n  clientName  String\n  clientEmail String\n  clientPhone String\n\n  // Event info\n  eventType   EventType\n  eventDate   DateTime\n  location    String\n  guestCount  Int?\n  budgetRange BudgetRange\n  notes       String?     @db.Text\n\n  // Status\n  status BookingStatus @default(NEW_REQUEST)\n\n  // Internal\n  internalNotes String? @db.Text\n  assignedTo    String? // name of coordinator\n\n  // Payment tracking\n  agreedAmount  Float?\n  depositAmount Float?\n  depositPaid   Boolean   @default(false)\n  depositDate   DateTime?\n  balancePaid   Boolean   @default(false)\n  balanceDate   DateTime?\n\n  // Relations\n  messages    Message[]\n  invitations WeddingInvitation[]\n\n  // Timestamps\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Proposals\n  proposals Proposal[]\n}\n\nenum EventType {\n  WEDDING\n  BIRTHDAY\n  CORPORATE\n  GRADUATION\n  ENGAGEMENT\n  ANNIVERSARY\n  CULTURAL\n  OTHER\n}\n\nenum BudgetRange {\n  UNDER_50K // Under ETB 50,000\n  RANGE_50K_100K // ETB 50,000 – 100,000\n  RANGE_100K_200K // ETB 100,000 – 200,000\n  RANGE_200K_500K // ETB 200,000 – 500,000\n  ABOVE_500K // Above ETB 500,000\n}\n\nenum BookingStatus {\n  NEW_REQUEST\n  CONTACTED\n  CONFIRMED\n  PLANNED\n  COMPLETED\n  CANCELLED\n}\n\n// ─────────────────────────────────────────\n// MESSAGES (Client Communication Log)\n// ─────────────────────────────────────────\nmodel Message {\n  id        String        @id @default(cuid())\n  bookingId String\n  booking   Booking       @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n  sender    MessageSender\n  content   String        @db.Text\n  createdAt DateTime      @default(now())\n}\n\nenum MessageSender {\n  ADMIN\n  SYSTEM // auto-generated status change messages\n}\n\n// ─────────────────────────────────────────\n// GALLERY\n// ─────────────────────────────────────────\nmodel GalleryImage {\n  id             String          @id @default(cuid())\n  title          String\n  description    String?\n  imageUrl       String // Supabase Storage URL\n  category       GalleryCategory\n  isFeatured     Boolean         @default(false)\n  isBeforeAfter  Boolean         @default(false)\n  beforeImageUrl String? // only if isBeforeAfter = true\n  afterImageUrl  String? // only if isBeforeAfter = true\n  sortOrder      Int             @default(0)\n  createdAt      DateTime        @default(now())\n}\n\nenum GalleryCategory {\n  WEDDINGS\n  BIRTHDAYS\n  CORPORATE\n  DECORATIONS\n  BEHIND_THE_SCENES\n}\n\n// ─────────────────────────────────────────\n// SERVICE PACKAGES\n// ─────────────────────────────────────────\nmodel PackageCategory {\n  id          String   @id @default(cuid())\n  name        String\n  slug        String   @unique\n  description String?\n  coverImage  String?\n  sortOrder   Int      @default(0)\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  packages Package[]\n}\n\nmodel Package {\n  id String @id @default(cuid())\n\n  categoryId String\n  category   PackageCategory @relation(fields: [categoryId], references: [id], onDelete: Restrict)\n\n  name        String\n  shortDesc   String @default(\"\")\n  description String @db.Text\n\n  price      Float?\n  priceLabel String\n\n  features   String[]\n  exclusions String[] @default([])\n\n  imageUrl      String?\n  galleryImages String[] @default([])\n\n  isPopular  Boolean @default(false)\n  isFeatured Boolean @default(false)\n  isActive   Boolean @default(true)\n  sortOrder  Int     @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// ════════════════════════════════════════════\n// WEDDING DIGITAL CARD / INVITATION SYSTEM\n// ════════════════════════════════════════════\n\nmodel WeddingInvitation {\n  id String @id @default(cuid())\n\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n\n  brideName String\n  groomName String\n  slug      String @unique\n\n  weddingDate DateTime\n  weddingTime String\n\n  venueName    String\n  venueAddress String\n  dressCode    String?\n  mapUrl       String?\n\n  welcomeMessage String?  @db.Text\n  story          String?  @db.Text\n  heroImageUrl   String?\n  coverImage     String?\n  galleryImages  String[] @default([])\n\n  templateKey    String          @default(\"FLORAL_LUXURY\")\n  theme          InvitationTheme @default(FLORAL_LUXURY)\n  themeColor     String?\n  primaryColor   String?\n  secondaryColor String?\n  customMessage  String?         @db.Text\n\n  floralTopLeft     String?\n  floralTopRight    String?\n  floralBottomLeft  String?\n  floralBottomRight String?\n\n  status            InvitationStatus @default(DRAFT)\n  allowRSVP         Boolean          @default(true)\n  allowGiftRegistry Boolean          @default(true)\n  publishedAt       DateTime?\n  isPublished       Boolean          @default(false)\n  pdfUrl            String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // NEW RELATIONS for card content\n  invitationMessage InvitationMessage?\n  loveStories       LoveStory[]\n  programItems      ProgramItem[]\n  venueDetails      VenueDetail?\n\n  gifts        GiftRegistry[]\n  reservations GiftReservation[]\n  rsvps        RSVP[]\n}\n\n// ── NEW: Invitation message (the main text) ──\nmodel InvitationMessage {\n  id        String            @id @default(cuid())\n  weddingId String            @unique\n  wedding   WeddingInvitation @relation(fields: [weddingId], references: [id], onDelete: Cascade)\n  preline   String            @default(\"We are getting married\")\n  message   String            @db.Text\n  createdAt DateTime          @default(now())\n  updatedAt DateTime          @updatedAt\n}\n\n// ── NEW: Love Story timeline entries ──\nmodel LoveStory {\n  id          String            @id @default(cuid())\n  weddingId   String\n  wedding     WeddingInvitation @relation(fields: [weddingId], references: [id], onDelete: Cascade)\n  year        String\n  title       String\n  description String            @db.Text\n  sortOrder   Int               @default(0)\n  createdAt   DateTime          @default(now())\n  updatedAt   DateTime          @updatedAt\n}\n\n// ── NEW: Day Program / Schedule items ──\nmodel ProgramItem {\n  id          String            @id @default(cuid())\n  weddingId   String\n  wedding     WeddingInvitation @relation(fields: [weddingId], references: [id], onDelete: Cascade)\n  time        String\n  title       String\n  description String            @default(\"\") @db.Text\n  sortOrder   Int               @default(0)\n  createdAt   DateTime          @default(now())\n  updatedAt   DateTime          @updatedAt\n}\n\n// ── NEW: Venue details (enhanced) ──\nmodel VenueDetail {\n  id             String            @id @default(cuid())\n  weddingId      String            @unique\n  wedding        WeddingInvitation @relation(fields: [weddingId], references: [id], onDelete: Cascade)\n  name           String\n  address        String\n  googleMapsLink String?\n  eventTime      String            @default(\"4:30 PM – Late\")\n  dressCode      String?\n  createdAt      DateTime          @default(now())\n  updatedAt      DateTime          @updatedAt\n}\n\n// ── EXISTING: RSVP responses ──\nmodel RSVP {\n  id String @id @default(cuid())\n\n  invitationId String\n  invitation   WeddingInvitation @relation(fields: [invitationId], references: [id], onDelete: Cascade)\n\n  guestName  String\n  guestPhone String?\n  attendance RSVPStatus\n  message    String?    @db.Text\n\n  createdAt DateTime @default(now())\n}\n\n// ── EXISTING: Gift registry ──\nmodel GiftRegistry {\n  id String @id @default(cuid())\n\n  invitationId String\n  invitation   WeddingInvitation @relation(fields: [invitationId], references: [id], onDelete: Cascade)\n\n  giftName        String\n  title           String?\n  description     String?\n  imageUrl        String?\n  priority        Int          @default(1)\n  priorityLabel   GiftPriority @default(MEDIUM)\n  allowDuplicates Boolean      @default(false)\n\n  isReserved      Boolean @default(false)\n  reservedBy      String?\n  reservedMessage String?\n\n  createdAt DateTime @default(now())\n\n  reservations GiftReservation[]\n}\n\nmodel GiftReservation {\n  id String @id @default(cuid())\n\n  invitationId String\n  invitation   WeddingInvitation @relation(fields: [invitationId], references: [id], onDelete: Cascade)\n\n  giftId String\n  gift   GiftRegistry @relation(fields: [giftId], references: [id], onDelete: Cascade)\n\n  reservedBy      String\n  reservedMessage String?\n\n  createdAt DateTime @default(now())\n}\n\nmodel DesignAsset {\n  id        String        @id @default(cuid())\n  name      String\n  imageUrl  String\n  category  AssetCategory\n  createdAt DateTime      @default(now())\n}\n\nenum InvitationTheme {\n  FLORAL_LUXURY\n  MODERN_MINIMAL\n  ROYAL_GOLD\n  TRADITIONAL_ETHIOPIAN\n  ELEGANT_BLACK\n  GARDEN_WEDDING\n  LUXURY_WHITE\n  CLASSIC_SERIF\n}\n\nenum RSVPStatus {\n  ATTENDING\n  NOT_ATTENDING\n  MAYBE\n  ACCEPTED\n  DECLINED\n}\n\nenum InvitationStatus {\n  DRAFT\n  REVIEW\n  APPROVED\n  PUBLISHED\n  ARCHIVED\n}\n\nenum GiftPriority {\n  LOW\n  MEDIUM\n  HIGH\n}\n\nenum AssetCategory {\n  FLORAL\n  FRAME\n  ORNAMENT\n  TEXTURE\n}\n\n// ─────────────────────────────────────────\n// PROPOSAL & QUOTATION SYSTEM\n// ─────────────────────────────────────────\n\nenum ProposalStatus {\n  DRAFT\n  SENT\n  VIEWED\n  APPROVED\n  REJECTED\n  EXPIRED\n}\n\nenum ProposalItemCategory {\n  DECORATION\n  CATERING\n  PHOTOGRAPHY\n  VENUE\n  ENTERTAINMENT\n  FLORAL\n  LIGHTING\n  TRANSPORT\n  COORDINATION\n  CUSTOM\n}\n\nmodel Proposal {\n  id String @id @default(cuid())\n\n  bookingId String\n  booking   Booking @relation(fields: [bookingId], references: [id])\n\n  title          String\n  proposalNumber String  @unique\n  introduction   String? @db.Text\n  eventVision    String? @db.Text\n  themeConcept   String? @db.Text\n\n  totalAmount Float\n  currency    String         @default(\"ETB\")\n  status      ProposalStatus @default(DRAFT)\n  validUntil  DateTime?\n\n  pdfUrl           String?\n  publicToken      String    @unique\n  clientApproved   Boolean   @default(false)\n  clientApprovedAt DateTime?\n  clientRejected   Boolean   @default(false)\n  rejectionReason  String?\n\n  notes String? @db.Text\n\n  createdById String\n  createdBy   User   @relation(fields: [createdById], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  items     ProposalItem[]\n  sections  ProposalSection[]\n  contracts ProposalContract[]\n  comments  ProposalComment[]\n}\n\nmodel ProposalItem {\n  id String @id @default(cuid())\n\n  proposalId String\n  proposal   Proposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)\n\n  title       String\n  description String?\n  quantity    Int                  @default(1)\n  unitPrice   Float\n  totalPrice  Float\n  category    ProposalItemCategory\n  sortOrder   Int                  @default(0)\n\n  createdAt DateTime @default(now())\n}\n\nmodel ProposalSection {\n  id String @id @default(cuid())\n\n  proposalId String\n  proposal   Proposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)\n\n  title     String\n  content   String @db.Text\n  sortOrder Int    @default(0)\n\n  createdAt DateTime @default(now())\n}\n\nmodel ProposalContract {\n  id String @id @default(cuid())\n\n  proposalId String\n  proposal   Proposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)\n\n  title   String\n  content String @db.Text\n\n  createdAt DateTime @default(now())\n}\n\nmodel ProposalComment {\n  id String @id @default(cuid())\n\n  proposalId String\n  proposal   Proposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)\n\n  authorName String\n  content    String @db.Text\n\n  createdAt DateTime @default(now())\n}\n\nmodel ProposalTemplate {\n  id String @id @default(cuid())\n\n  name        String\n  description String?\n  eventType   EventType?\n  coverImage  String?\n\n  sections      String  @db.Text // JSON array of template sections\n  contractTerms String? @db.Text\n\n  isActive    Boolean @default(true)\n  createdById String\n  createdBy   User    @relation(fields: [createdById], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n",
  "inlineSchemaHash": "312ad14d37a300bafc321f9d3d1427afe42a2785f5987d059a98f40f4b12c665",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UserRole\",\"default\":\"STAFF\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"proposals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Proposal\",\"relationName\":\"ProposalToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposalTemplates\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProposalTemplate\",\"relationName\":\"ProposalTemplateToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Booking\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientPhone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EventType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"guestCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"budgetRange\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BudgetRange\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BookingStatus\",\"default\":\"NEW_REQUEST\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"internalNotes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedTo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agreedAmount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"depositAmount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"depositPaid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"depositDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"balancePaid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"balanceDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"relationName\":\"BookingToMessage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"BookingToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"proposals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Proposal\",\"relationName\":\"BookingToProposal\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Message\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookingId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"booking\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Booking\",\"relationName\":\"BookingToMessage\",\"relationFromFields\":[\"bookingId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MessageSender\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GalleryImage\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GalleryCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isFeatured\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isBeforeAfter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"beforeImageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"afterImageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PackageCategory\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coverImage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"packages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Package\",\"relationName\":\"PackageToPackageCategory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Package\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PackageCategory\",\"relationName\":\"PackageToPackageCategory\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shortDesc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priceLabel\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"features\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"exclusions\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"galleryImages\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPopular\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isFeatured\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"WeddingInvitation\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookingId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"booking\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Booking\",\"relationName\":\"BookingToWeddingInvitation\",\"relationFromFields\":[\"bookingId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brideName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groomName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weddingDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weddingTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"venueName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"venueAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dressCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mapUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"welcomeMessage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"story\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"heroImageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coverImage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"galleryImages\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"templateKey\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"FLORAL_LUXURY\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"theme\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"InvitationTheme\",\"default\":\"FLORAL_LUXURY\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"themeColor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"primaryColor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"secondaryColor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customMessage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"floralTopLeft\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"floralTopRight\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"floralBottomLeft\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"floralBottomRight\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"InvitationStatus\",\"default\":\"DRAFT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"allowRSVP\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"allowGiftRegistry\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publishedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPublished\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pdfUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"invitationMessage\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InvitationMessage\",\"relationName\":\"InvitationMessageToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loveStories\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LoveStory\",\"relationName\":\"LoveStoryToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"programItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProgramItem\",\"relationName\":\"ProgramItemToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"venueDetails\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"VenueDetail\",\"relationName\":\"VenueDetailToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gifts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GiftRegistry\",\"relationName\":\"GiftRegistryToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GiftReservation\",\"relationName\":\"GiftReservationToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rsvps\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RSVP\",\"relationName\":\"RSVPToWeddingInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"InvitationMessage\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weddingId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wedding\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"InvitationMessageToWeddingInvitation\",\"relationFromFields\":[\"weddingId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preline\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"We are getting married\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LoveStory\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weddingId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wedding\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"LoveStoryToWeddingInvitation\",\"relationFromFields\":[\"weddingId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProgramItem\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weddingId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wedding\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"ProgramItemToWeddingInvitation\",\"relationFromFields\":[\"weddingId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"VenueDetail\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weddingId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wedding\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"VenueDetailToWeddingInvitation\",\"relationFromFields\":[\"weddingId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"googleMapsLink\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"4:30 PM – Late\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dressCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RSVP\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"RSVPToWeddingInvitation\",\"relationFromFields\":[\"invitationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"guestName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"guestPhone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attendance\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RSVPStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GiftRegistry\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"GiftRegistryToWeddingInvitation\",\"relationFromFields\":[\"invitationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"giftName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priority\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priorityLabel\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"GiftPriority\",\"default\":\"MEDIUM\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"allowDuplicates\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isReserved\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservedMessage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GiftReservation\",\"relationName\":\"GiftRegistryToGiftReservation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GiftReservation\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WeddingInvitation\",\"relationName\":\"GiftReservationToWeddingInvitation\",\"relationFromFields\":[\"invitationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"giftId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gift\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GiftRegistry\",\"relationName\":\"GiftRegistryToGiftReservation\",\"relationFromFields\":[\"giftId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservedMessage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DesignAsset\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AssetCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Proposal\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookingId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"booking\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Booking\",\"relationName\":\"BookingToProposal\",\"relationFromFields\":[\"bookingId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposalNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"introduction\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventVision\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"themeConcept\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalAmount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"ETB\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ProposalStatus\",\"default\":\"DRAFT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validUntil\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pdfUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publicToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientApproved\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientApprovedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientRejected\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rejectionReason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdById\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ProposalToUser\",\"relationFromFields\":[\"createdById\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"items\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProposalItem\",\"relationName\":\"ProposalToProposalItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProposalSection\",\"relationName\":\"ProposalToProposalSection\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contracts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProposalContract\",\"relationName\":\"ProposalToProposalContract\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProposalComment\",\"relationName\":\"ProposalToProposalComment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProposalItem\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposal\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Proposal\",\"relationName\":\"ProposalToProposalItem\",\"relationFromFields\":[\"proposalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unitPrice\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalPrice\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProposalItemCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProposalSection\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposal\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Proposal\",\"relationName\":\"ProposalToProposalSection\",\"relationFromFields\":[\"proposalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProposalContract\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposal\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Proposal\",\"relationName\":\"ProposalToProposalContract\",\"relationFromFields\":[\"proposalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProposalComment\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proposal\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Proposal\",\"relationName\":\"ProposalToProposalComment\",\"relationFromFields\":[\"proposalId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProposalTemplate\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EventType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coverImage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sections\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contractTerms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdById\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ProposalTemplateToUser\",\"relationFromFields\":[\"createdById\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"UserRole\":{\"values\":[{\"name\":\"SUPER_ADMIN\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"STAFF\",\"dbName\":null}],\"dbName\":null},\"EventType\":{\"values\":[{\"name\":\"WEDDING\",\"dbName\":null},{\"name\":\"BIRTHDAY\",\"dbName\":null},{\"name\":\"CORPORATE\",\"dbName\":null},{\"name\":\"GRADUATION\",\"dbName\":null},{\"name\":\"ENGAGEMENT\",\"dbName\":null},{\"name\":\"ANNIVERSARY\",\"dbName\":null},{\"name\":\"CULTURAL\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null}],\"dbName\":null},\"BudgetRange\":{\"values\":[{\"name\":\"UNDER_50K\",\"dbName\":null},{\"name\":\"RANGE_50K_100K\",\"dbName\":null},{\"name\":\"RANGE_100K_200K\",\"dbName\":null},{\"name\":\"RANGE_200K_500K\",\"dbName\":null},{\"name\":\"ABOVE_500K\",\"dbName\":null}],\"dbName\":null},\"BookingStatus\":{\"values\":[{\"name\":\"NEW_REQUEST\",\"dbName\":null},{\"name\":\"CONTACTED\",\"dbName\":null},{\"name\":\"CONFIRMED\",\"dbName\":null},{\"name\":\"PLANNED\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":null},\"MessageSender\":{\"values\":[{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"SYSTEM\",\"dbName\":null}],\"dbName\":null},\"GalleryCategory\":{\"values\":[{\"name\":\"WEDDINGS\",\"dbName\":null},{\"name\":\"BIRTHDAYS\",\"dbName\":null},{\"name\":\"CORPORATE\",\"dbName\":null},{\"name\":\"DECORATIONS\",\"dbName\":null},{\"name\":\"BEHIND_THE_SCENES\",\"dbName\":null}],\"dbName\":null},\"InvitationTheme\":{\"values\":[{\"name\":\"FLORAL_LUXURY\",\"dbName\":null},{\"name\":\"MODERN_MINIMAL\",\"dbName\":null},{\"name\":\"ROYAL_GOLD\",\"dbName\":null},{\"name\":\"TRADITIONAL_ETHIOPIAN\",\"dbName\":null},{\"name\":\"ELEGANT_BLACK\",\"dbName\":null},{\"name\":\"GARDEN_WEDDING\",\"dbName\":null},{\"name\":\"LUXURY_WHITE\",\"dbName\":null},{\"name\":\"CLASSIC_SERIF\",\"dbName\":null}],\"dbName\":null},\"RSVPStatus\":{\"values\":[{\"name\":\"ATTENDING\",\"dbName\":null},{\"name\":\"NOT_ATTENDING\",\"dbName\":null},{\"name\":\"MAYBE\",\"dbName\":null},{\"name\":\"ACCEPTED\",\"dbName\":null},{\"name\":\"DECLINED\",\"dbName\":null}],\"dbName\":null},\"InvitationStatus\":{\"values\":[{\"name\":\"DRAFT\",\"dbName\":null},{\"name\":\"REVIEW\",\"dbName\":null},{\"name\":\"APPROVED\",\"dbName\":null},{\"name\":\"PUBLISHED\",\"dbName\":null},{\"name\":\"ARCHIVED\",\"dbName\":null}],\"dbName\":null},\"GiftPriority\":{\"values\":[{\"name\":\"LOW\",\"dbName\":null},{\"name\":\"MEDIUM\",\"dbName\":null},{\"name\":\"HIGH\",\"dbName\":null}],\"dbName\":null},\"AssetCategory\":{\"values\":[{\"name\":\"FLORAL\",\"dbName\":null},{\"name\":\"FRAME\",\"dbName\":null},{\"name\":\"ORNAMENT\",\"dbName\":null},{\"name\":\"TEXTURE\",\"dbName\":null}],\"dbName\":null},\"ProposalStatus\":{\"values\":[{\"name\":\"DRAFT\",\"dbName\":null},{\"name\":\"SENT\",\"dbName\":null},{\"name\":\"VIEWED\",\"dbName\":null},{\"name\":\"APPROVED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"EXPIRED\",\"dbName\":null}],\"dbName\":null},\"ProposalItemCategory\":{\"values\":[{\"name\":\"DECORATION\",\"dbName\":null},{\"name\":\"CATERING\",\"dbName\":null},{\"name\":\"PHOTOGRAPHY\",\"dbName\":null},{\"name\":\"VENUE\",\"dbName\":null},{\"name\":\"ENTERTAINMENT\",\"dbName\":null},{\"name\":\"FLORAL\",\"dbName\":null},{\"name\":\"LIGHTING\",\"dbName\":null},{\"name\":\"TRANSPORT\",\"dbName\":null},{\"name\":\"COORDINATION\",\"dbName\":null},{\"name\":\"CUSTOM\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

