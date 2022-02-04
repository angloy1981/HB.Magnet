using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HB.Magnet.CustomMenu.Dto
{
    public class MetaDto
    {
        public string Title { get; set; }
        public string Icon { get; set; }
        public List<string> Roles { get; set; }
    }
    public class CustomMenuOutputDto : Entity
    {
        public CustomMenuOutputDto()
        {
            Children = new List<CustomMenuOutputDto>();
            Meta = new MetaDto();
        }
        public int Pid { get; set; }
        public string Component { get; set; }
        public string Name { get; set; }
        public MetaDto Meta { get; set; }
        public List<CustomMenuOutputDto> Children { get; set; }
    }
}
