import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, Render } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ResponseFactory } from '../../common/dto/response.dto';
import { SportsService } from './sports.service';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { CreateSportDto } from '../../common/dto/create-sport.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RolesGuard } from '../../common/guards/role-based-guard';
import { UpdateSportDto } from '../../common/dto/update-sport.dto';

@ApiTags('sports')
@Controller('/sports')
@UseGuards(RolesGuard)
export class SportsController {
    constructor(private readonly sportsService: SportsService) { }

    @Get()
    @Roles(Role.ADMIN)
    @Render('pages/admin-sports')
    async getSportsForPage() {
        const sports = await this.sportsService.findAll();
        return {
            sports
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get sport details by ID' })
    async findOne(@Param('id') id: string) {
        const sportEntity = await this.sportsService.findOne(id);
        return ResponseFactory.success(sportEntity, 'Class details retrieved successfully');
    }

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Create a new sport (Admin only)' })
    async create(@Body() createSportDto: CreateSportDto) {
        const newSport = await this.sportsService.create(createSportDto);
        return ResponseFactory.success(newSport, 'Sport created successfully');
    }

    @Post(':id/edit')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Update a sport (Admin only)' })
    async update(@Param('id') id: string, @Body() UpdateSportDto: UpdateSportDto) {
        const updatedClass = await this.sportsService.update(id, UpdateSportDto);
        return ResponseFactory.success(updatedClass, 'Sport updated successfully');
    }

    @Post(':id/delete')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Delete a sport (Admin only)' })
    async delete(@Param('id') id: string) {
        await this.sportsService.delete(id);
        return ResponseFactory.success(null, 'Sport deleted successfully');
    }
}