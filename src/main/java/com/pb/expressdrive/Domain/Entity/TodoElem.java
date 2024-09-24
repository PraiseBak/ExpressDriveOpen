package com.pb.expressdrive.Domain.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@DynamicInsert
@ToString
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TodoElem extends BaseTimeEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ColumnDefault("0")
    private boolean isChecked;

    @NotBlank
    @Size(min = 2,max = 1000)
    private String todoElemContent;

    @ManyToOne
    @ToString.Exclude
    @JsonIgnore
    private Todo todo;

}
