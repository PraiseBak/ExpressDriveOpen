package com.pb.expressdrive.Domain.Dto;


import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class TraceHeatmapDto
{
    String title;
    LocalDateTime createdDate;
}
