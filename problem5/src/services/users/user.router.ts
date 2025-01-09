import { Router } from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../utils/middlewares/validation.middleware';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from './user.dto';

const router = Router();
const controller = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validateRequest(CreateUserDto), controller.create.bind(controller));

/**
 * @swagger
 * components:
 *   parameters:
 *     FilterUserParams:
 *       in: query
 *       name: filters
 *       schema:
 *         $ref: '#/components/schemas/FilterUserDto'
 * /users:
 *   get:
 *     summary: Get all users with optional filters
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/FilterUserParams'
 *     responses:
 *       200:
 *         description: List of filtered users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   $ref: '#/components/schemas/UserResponseDto'
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMetaDto'
 */
router.get('/', validateRequest(FilterUserDto), controller.findAll.bind(controller));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       404:
 *         description: User not found
 */
router.get('/:id', controller.findById.bind(controller));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       400:
 *        description: Validation error
 *        content:
 *         application/json:
 *          schema:
 *          $ref: '#/components/schemas/Error'
 */
router.put('/:id', validateRequest(UpdateUserDto), controller.update.bind(controller));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;
